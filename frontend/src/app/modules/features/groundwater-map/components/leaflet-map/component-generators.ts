import * as L from 'leaflet';
import 'leaflet-canvas-marker'
import { WellPopupData, SuggestedMonitoringPopupData } from "../../interfaces/PopupData";
import { ModalData } from "../../interfaces/ModalData";
import { RegionSelectionComponent } from "../region-selection/region-selection.component";
import { WellModalComponent } from '../well-modal/well-modal.component';

export function generateSuggestedMonitoringPopup(data: SuggestedMonitoringPopupData): HTMLDivElement {
    let popup  = L.DomUtil.create("div")

    popup.innerHTML = `
        <div class="title-box py-1 mb-1 px-2">
            <div class="text-white well-name py-0 my-0">${data.Region}</div>
            <div class="text-muted well-county py-0 my-0 display-6">${data.Aquifer}</div>
        </div>

        <div class="px-2">
            <div class="row justify-content-center">
                <table class="table table-sm table-centered table-borderless mb-0">
                    <thead class="table-head">
                        <tr>
                            <th>Function</th>
                            <th>Depth</th>
                            <th>Artesian</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${data.Function}</td>
                            <td>${data.Depth}</td>
                            <td>${data.Artesian}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    `
    return popup
}

// Generate the region selection component as a div with an angular component instance inside
export function generateRegionSelect(appRef, injector, componentFactoryResolver): HTMLDivElement {
    let compFactory = componentFactoryResolver.resolveComponentFactory(RegionSelectionComponent)
    let compRef = compFactory.create(injector)
    appRef.attachView(compRef.hostView)
    compRef.onDestroy(()=> appRef.detachView(compRef.hostView))

    let div = L.DomUtil.create('div')
    div.appendChild(compRef.location.nativeElement)

    L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation) // dont let click/scroll propagate to the map
    L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation)

    return div
}

// Generate the map legend component
export function generateLegend(): HTMLDivElement {
    var div = L.DomUtil.create("div", "legend p-2");
    div.innerHTML = `
        <h6>Groundwater Level</h6>
        <img src="/assets/icons/Increasing.png" class="legend-icon">  <span>Increasing</span><br><br>
        <img src="/assets/icons/Steady.png" class="legend-icon">  <span>Steady</span><br><br>
        <img src="/assets/icons/Decreasing.png" class="legend-icon">  <span>Decreasing</span><br><br>
        <img src="/assets/icons/NoTrend.png" class="legend-icon">  <span>Insufficient Data</span><br><br>
        <h6>Map Features</h6>
        <svg width="20" height="15"><rect width="20" height="15"style="fill:#A60014;stroke:#A60014;stroke-width:6;fill-opacity:0.3;stroke-opacity:0.4" /></svg>  <span>Recommended Locations for New Groundwater Monitoring Wells</span><br><br>
        <svg width="20" height="15"><rect width="20" height="15"style="fill:#CBDDC8;stroke:#9BC097;stroke-width:6;fill-opacity:0.7;stroke-opacity:0.7" /></svg>  <span>High Priority Region for Groundwater Monitoring Network Expansion</span><br><br>
        <svg width="20" height="15"><rect width="20" height="15"style="fill:blue;stroke:#0000FF;stroke-width:6;fill-opacity:0.0;stroke-opacity:0.5" /></svg>  <span>Groundwater Basins</span><br><br>
        <span style="height: 9px; width: 9px; background-color: #6b6a6a; border-radius: 50%; display: inline-block; "></span>  <span>Point of Diversion</span><br><span>(Larger Size = Greater Water Right)</span><br><br>
    `
    return div;
}

// Generate a well-specific popup based on its data
export function generateWellPopup(data: WellPopupData, modalData: ModalData): HTMLDivElement {
    let popup  = L.DomUtil.create("div", "well-popup")

    popup.innerHTML = `
        <div class="title-box py-1 mb-1 px-2">
            <div class="text-white well-name py-0 my-0"> ${data.PointID}</div>
            <div class="text-muted well-county py-0 my-0 display-6">Groundwater Trend: ${data.Trend}</div>
            <div class="text-muted well-county py-0 my-0 display-6">Agency: ${data.Agency}</div>
        </div>

        <div class="px-2">
            <div class="row justify-content-center">
                <table class="table table-sm table-centered table-borderless mb-0">
                    <thead class="table-head">
                        <tr>
                            <th># of Observations</th>
                            <th>Latest Observation</th>
                            <th>Latest Depth to Water</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${data.NumObservations}</td>
                            <td>${data.LastObservationDate}</td>
                            <td>${data.LastObservationValue} ft.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    `
    // Manually add button with eventlistener that opens the modal
    const button = document.createElement('button')
    button.innerHTML = '<span class="button-text">Detailed Info</span>'
    button.addEventListener('click', ()=> {
        const modalRef = window.wellModalService.open(WellModalComponent, {size: 'xl'})
        modalRef.componentInstance.modalData = modalData
    })
    button.className = "btn btn-dark rounded-pill py-0"

    const buttonDiv = document.createElement('div')
    buttonDiv.className = "text-center py-md-2"
    buttonDiv.appendChild(button)
    popup.appendChild(buttonDiv)

    return popup
}
