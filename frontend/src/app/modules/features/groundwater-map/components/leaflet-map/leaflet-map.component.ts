import { AfterViewInit, ApplicationRef, Component, ViewChild, ComponentFactoryResolver, OnInit, Injectable, Injector } from "@angular/core";
import { NgModel } from '@angular/forms'
import 'leaflet-pixi-overlay'
import * as PIXI from 'pixi.js'

import * as L from 'leaflet';
import { LayersService } from "../../services/layers.service";
import { environment } from "src/environments/environment";
import { RegionSelectionService } from "../../services/region-selection.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as OverlayStyle from '../../overlay-styles/overlay-styles'
import { SuggestedMonitoringPopupData, WellPopupData } from "../../interfaces/PopupData";
import { ModalData } from "../../interfaces/ModalData";
import { generateRegionSelect, generateLegend, generateWellPopup, generateSuggestedMonitoringPopup } from "./component-generators";

@Component({
    selector: 'app-leaflet-map',
    templateUrl: './leaflet-map.component.html',
    styleUrls: ['./leaflet-map.component.scss']
})

@Injectable()
export class LeafletMapComponent implements AfterViewInit, OnInit {
    @ViewChild('splashScreenContent') splashScreenContent: NgModel

    private map: L.Map;
    private projectRegionsOverlay: L.Layer
    private regionsOverlayControl: L.Layer
    private pixiLayer
    private redrawPixilayer = true
    private podsOverlay: L.Layer

    private projectRegionLabelThreshold = 9
    private isPrLabelsOn = false
    private projectRegionLabels: L.Layer

    constructor(
        private layersService: LayersService,
        private regionSelectionService: RegionSelectionService,
        private wellModalService: NgbModal,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef
    ) {
        // Fly to region when selected from dropdown
        this.regionSelectionService.getSelectedRegion().subscribe(regionSelection => {

            // Remove and dont redraw well layer while in motion, to increase performance
            this.map.once('movestart', ()=> {
                this.redrawPixilayer = false
                this.map.removeLayer(this.pixiLayer)
            })
            this.map.once('moveend', ()=> {
                this.redrawPixilayer = true
                this.map.addLayer(this.pixiLayer)
                this.map.addLayer(this.regionsOverlayControl)
            })

            this.map.flyTo(regionSelection.coords, 10)
        })
    }

    public closeModal() {
      this.wellModalService.dismissAll()
    }

    private initMap(): void {
        this.layersService.returnJSONLayers()
        .subscribe((jsonLayers) => {

            // Define map
            this.map = L.map('map', {
                center: [34.5199, -105.8701],
                zoom: 7,
                maxZoom: 13,
                minZoom: 7,
                maxBounds: L.latLngBounds([30.38, -110.76], [38.56, -101.79]),
                preferCanvas: true,
                zoomControl: false,
            });

            // Add legend
            let legend = new L.Control({position: 'bottomleft'});
            legend.onAdd = () => {return generateLegend()}
            legend.addTo(this.map);

            // Add region select
            let regionSelect = new L.Control({position: 'topright'})
            regionSelect.onAdd = () => {return generateRegionSelect(this.appRef, this.injector, this.componentFactoryResolver)}
            regionSelect.addTo(this.map)

            // Define basin overlay
            var basinOverlay = L.geoJSON(jsonLayers.groundwaterBasins, {style: OverlayStyle.basin})

            // Define project regions overlay
            this.projectRegionsOverlay = L.geoJSON(jsonLayers.projectRegions, {style: OverlayStyle.projectRegion})

            // Define suggested monitoring regions overlay and add popups for each region
            var suggestedMonitoringRegions = L.geoJSON(jsonLayers.suggestedMonitoringRegions, {
                style: OverlayStyle.suggestedMonitoringRegion,
                onEachFeature(feature, layer) {
                    var fp = feature.properties
                    var data: SuggestedMonitoringPopupData = {
                        Region: fp.Region,
                        Aquifer: fp.Aquifer,
                        Function: fp.Type,
                        Depth: fp.Depth,
                        Artesian: fp.Artesian
                    }
                    layer.bindPopup(generateSuggestedMonitoringPopup(data))
                }
            })

            // Define the text labels for the project regions
            this.projectRegionLabels = L.geoJSON(jsonLayers.projectRegions, {
                style: OverlayStyle.projectRegionLabels,
                onEachFeature(feature, layer) {
                    layer.bindTooltip(feature.properties.Region + " Region", {interactive: false, permanent: true })
                }
            })

            // Define the PODs overlay
            this.podsOverlay = L.tileLayer(environment.BucketURL + '/podtilesmap/{z}/{x}/{y}.png', {
                maxZoom: 13,
                minZoom: 7,
                bounds: L.latLngBounds([37.000114, -103.002513], [31.332294, -109.049881]) // dont request tiles outside new mexico
            });

            // Define the base map
            const baseMapOSM = L.tileLayer(environment.BucketURL + '/basemap/{z}/{x}/{y}.png', {
                maxZoom: 13,
                minZoom: 7,
                attribution: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
            });

            // Define custom layer used for toggling suggested monitoring and project regions
            this.regionsOverlayControl = L.layerGroup()
                .addLayer(suggestedMonitoringRegions)
                .addLayer(this.projectRegionsOverlay)
                .addLayer(this.projectRegionLabels)

            suggestedMonitoringRegions.on({'add': function() {
              suggestedMonitoringRegions.bringToFront()
              this.projectRegionsOverlay.bringToBack()
              this.projectRegionLabels.bringToFront()
            }})

            // Add starting overlays and basemap to leaflet map
            baseMapOSM.addTo(this.map);
            basinOverlay.addTo(this.map);
            this.podsOverlay.addTo(this.map);

            // Add overlays to map controls
            var baseMaps = {
                "Surface Map": baseMapOSM
            };

            var overlayMaps = {
                'Basin': basinOverlay,
                'PODS': this.podsOverlay,
                'Suggested Monitoring/Project Regions': this.regionsOverlayControl,
            };

            L.control.layers(baseMaps, overlayMaps, {position: 'bottomright'}).addTo(this.map);
            L.control.zoom({position: 'topleft'}).addTo(this.map)

            // Add the well markers as a PIXI layer
            const URL = '../../../../../../assets/icons/'
            PIXI.Assets.load([`${URL}Steady.svg`, `${URL}NoTrend.svg`, `${URL}Decreasing.svg`, `${URL}Increasing.svg`]).then((assetRecords) => {

                let zoomChangeTs = null
                let pixiContainer = new PIXI.Container()
                var wells = jsonLayers.wellPoints.features
                var markerSprites = []

                this.pixiLayer = (function() {
                    return L.pixiOverlay(function(utils, event) {

                        // Helper function that generates objects used in displaying the well and well information
                        function getWellDisplayObjects(well: any): [any, any, any] {

                            let featureProperties = well.properties

                            let iconImage

                            let ds = featureProperties.dataseries[0]

                            if(ds.trend == "Increasing")
                            {
                                iconImage = 'Increasing.svg'
                            }
                            else if(ds.trend == "Decreasing")
                            {
                                iconImage = 'Decreasing.svg'
                            }
                            else if(ds.trend == "Steady")
                            {
                                iconImage = 'Steady.svg'
                            }
                            else {
                                iconImage = 'NoTrend.svg'
                                ds.trend = "Insufficient Data"
                            }

                            let popupData: WellPopupData = {
                                PointID: featureProperties.PointID ?? "Not Found",
                                Agency: featureProperties.agency ?? "USGS",
                                NumObservations: ds.num_observations ?? "0",
                                LastObservationDate: new Date(ds.datetime_end).toLocaleDateString('en-us') ?? "1999-01-01",
                                LastObservationValue: ds.datetime_end_value.toFixed(2) ?? "1999-01-01",
                                Trend: ds.trend ?? "Steady"
                            }
                            let modalData: ModalData = {
                                PointID: featureProperties.PointID ?? "Not Found",
                                Agency: featureProperties.agency ?? "USGS",
                                Use: featureProperties.Use ?? "Not Found",
                                Status: featureProperties.Status ?? "Active",
                                DiffFromMean: ds.latest_val_diff_from_mean ?? "Not Found",
                                CurrentDepth: featureProperties.WellDepth ?? "Not Found",
                                DepthToWaterCSVPath: ds.file_path_timeseries ?? "Not Found",
                                DivergenceFromMeanCSVPath: ds.file_path_timeseries_dfm ?? "Not Found",
                                Trend: ds.trend ?? "Not Found"
                            }
                            let coordinates : L.LatLngExpression = L.latLng(well.geometry.coordinates[1], well.geometry.coordinates[0])
                            let popup = generateWellPopup(popupData, modalData)

                            return [coordinates, popup, iconImage]
                        }

                        var zoom = utils.getMap().getZoom();
                        var container = utils.getContainer();
                        var renderer = utils.getRenderer();
                        var project = utils.latLngToLayerPoint;
                        var getScale = utils.getScale;
                        var invScale = zoom < 11 ? 0.4 / getScale() : 1.2 / getScale();

                        // The click doesnt naturally pass to the marker, it's done manually here
                        const boundary = new PIXI.EventBoundary(pixiContainer)
                        if(event.type === 'click') {

                              // The popup dom elements dont get removed sometimes after opening, do it manually (vanilla js....)
                              const popups = document.getElementsByClassName('well-popup')
                              for(let i = 0; i < popups.length; i++) {popups[i].parentNode.removeChild(popups[i])}

                              const interaction = utils.getRenderer().events;
                              const pointerEvent = event.clickEvent.originalEvent
                              const pixiPoint = new PIXI.Point();
                              interaction.mapPositionToPoint(pixiPoint, pointerEvent.clientX, pointerEvent.clientY);
                              const target = boundary.hitTest(pixiPoint.x, pixiPoint.y);
                              if (target) {
                                target.onclick(pointerEvent)
                              }
                        }

                        // On first draw of the layer, generate the well markers based on the geoJSON well points
                        if (event.type === 'add') {
                            wells.forEach((well) => {
                                let [coordinates, popup, iconImage] = getWellDisplayObjects(well)

                                const coords = project([coordinates.lat, coordinates.lng]);

                                const markerSprite = new PIXI.Sprite(PIXI.Assets.get(URL + iconImage))
                                markerSprite.eventMode = 'static'
                                markerSprite.x = coords.x;
                                markerSprite.y = coords.y;
                                markerSprite.scale.set(invScale);

                                markerSprite.onclick = (e:any) => {L.popup().setLatLng(coordinates).setContent(popup).openOn(utils.getMap())}
                                markerSprite.anchor.set(0.5, 0.5);
                                container.addChild(markerSprite);
                                markerSprites.push(markerSprite);
                            });
                        }

                        // On zoom, set the scale that markers should move towards over time
                        if (event.type === 'zoomanim') {
                            zoomChangeTs = 0;
                            var zoomLevel = event.zoom
                            var scale = getScale(zoomLevel)
                            var targetScale = zoomLevel < 11 ? 0.4 / scale : 1.2 / scale
                            markerSprites.forEach(function(markerSprite) {
                                markerSprite.currentScale = markerSprite.scale.x;
                                markerSprite.targetScale = targetScale;
                            });
                            return;
                        }

                        // On animation frame
                        if (event.type === 'redraw') {
                            var delta = event.delta;
                            // markerSprites.forEach(function(markerSprite) { // :)
                            // 	markerSprite.rotation -= 0.03 * delta;
                            // });

                            // If markers need to scale after a zoom, do that over time
                            if (zoomChangeTs !== null) {
                                var duration = 25;
                                zoomChangeTs += delta;
                                var lambda = zoomChangeTs / duration;
                                if (lambda > 1) {
                                    lambda = 1;
                                    zoomChangeTs = null;
                                }

                                lambda = lambda * (0.4 + lambda * (2.2 + lambda * -1.6));
                                markerSprites.forEach(function(markerSprite) {
                                    markerSprite.scale.set(markerSprite.currentScale + lambda * (markerSprite.targetScale - markerSprite.currentScale));
                                });
                            }
                            else {
                                markerSprites.forEach(function(markerSprite) {
                                    markerSprite.scale.set(invScale);
                                });
                            }
                        }
                        renderer.render(container);
                    }, pixiContainer);
                })();

                // Update loop to facilitate the marker's animated visual updates
                this.pixiLayer.addTo(this.map);
                let prevTime = 0
                const redraw = (time) => {
                    if (this.redrawPixilayer) { this.pixiLayer.redraw({type: 'redraw', delta: (time - prevTime) / 16}) }
                    prevTime = time;
                    requestAnimationFrame(redraw)
                }
                redraw(0)

                this.map.on('zoomanim', this.pixiLayer.redraw, this.pixiLayer);
                this.map.on('click', (e) => {this.pixiLayer.redraw({type: 'click', clickEvent: e})})
            })
        })
    }

    // Expose the modal service globally so it can be used from PIXI
    ngOnInit(): void {
        window.wellModalService = this.wellModalService
    }

    ngAfterViewInit() : void {
        this.wellModalService.open(this.splashScreenContent, {size:'xl'}); // Show modal on page load
        this.initMap();
    }
}
