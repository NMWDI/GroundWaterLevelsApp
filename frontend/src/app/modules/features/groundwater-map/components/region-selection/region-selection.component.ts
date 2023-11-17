import { Component } from "@angular/core";
import L from "leaflet";
import { RegionSelection } from "../../interfaces/RegionSelection";
import { RegionSelectionService } from "../../services/region-selection.service";

interface Region {
    name: string
    coords: L.LatLng
    type: string
}

@Component({
    selector: 'app-region-selection',
    templateUrl: './region-selection.component.html',
    styleUrls: ['./region-selection.component.scss']
})

export class RegionSelectionComponent {
    constructor(private regionSelectionService: RegionSelectionService) {}

    projectRegions: Region[] = [
        {name: "Animas Basin", coords: L.latLng(31.9780,-108.8133), type: 'ProjectArea'},
        {name: "Bluewater Basin", coords: L.latLng(35.2761,-108.0089), type: 'ProjectArea'},
        {name: "Clayton Area", coords: L.latLng(36.2763,-103.1449), type: 'ProjectArea'},
        {name: "Estancia Basin", coords: L.latLng(34.9121,-106.0065), type: 'ProjectArea'},
        {name: "Lower Rio Grande Basin", coords: L.latLng(32.69051,-106.76696), type: 'ProjectArea'},
        {name: "Mimbres Basin", coords: L.latLng(32.3636,-107.7349), type: 'ProjectArea'},
        {name: "Nutt Hocket Basin", coords: L.latLng(32.48399,-107.32700), type: 'ProjectArea'},
        {name: "Roswell-Artesia Area", coords: L.latLng(33.1916,-104.4348), type: 'ProjectArea'},
        {name: "Southern Lea County", coords: L.latLng(32.4126,-103.3857), type: 'ProjectArea'},
        {name: "Taos Area", coords: L.latLng(36.43003,-105.61659), type: 'ProjectArea'},
    ]

    countyRegions: Region[] = [
        {name: "Bernadillo", coords: L.latLng(35.0389,-106.6811), type: 'County'},
        {name: "Catron", coords: L.latLng(33.9067,-108.4072), type: 'County'},
        {name: "Ciabola", coords: L.latLng(34.9043,-108.0034), type: 'County'},
        {name: "Colfax", coords: L.latLng(36.5887,-104.5893), type: 'County'},
        {name: "Chaves", coords: L.latLng(33.4111,-104.4252), type: 'County'},
        {name: "Curry", coords: L.latLng(34.5668,-103.3442), type: 'County'},
        {name: "Dona Ana", coords: L.latLng(32.3397,-106.8360), type: 'County'},
        {name: "Eddy", coords: L.latLng(32.4615,-104.3066), type: 'County'},
        {name: "Guadalupe", coords: L.latLng(34.8531,-104.7819), type: 'County'},
        {name: "Grant", coords: L.latLng(32.7328,-108.3698), type: 'County'},
        {name: "Harding", coords: L.latLng(35.8997,-103.8512), type: 'County'},
        {name: "Hidalgo", coords: L.latLng(31.8954,-108.7009), type: 'County'},
        {name: "Lincoln", coords: L.latLng(33.7593,-105.4591), type: 'County'},
        {name: "Lea", coords: L.latLng(32.7862,-103.4200), type: 'County'},
        {name: "Los Alamos", coords: L.latLng(35.8787,-106.2977), type: 'County'},
        {name: "Luna", coords: L.latLng(32.1752,-107.7396), type: 'County'},
        {name: "McKinley", coords: L.latLng(35.6396,-108.1255), type: 'County'},
        {name: "Mora", coords: L.latLng(35.9841,-104.9198), type: 'County'},
        {name: "Otero", coords: L.latLng(32.6003,-105.7358), type: 'County'},
        {name: "Quay", coords: L.latLng(35.1692,-103.4660), type: 'County'},
        {name: "Roosavelt", coords: L.latLng(34.0285,-103.4916), type: 'County'},
        {name: "Rio Arriba", coords: L.latLng(36.5465,-106.7476), type: 'County'},
        {name: "San Juan", coords: L.latLng(36.4622,-108.2942), type: 'County'},
        {name: "Santa Fe", coords: L.latLng(35.5764,-105.9673), type: 'County'},
        {name: "San Miguel", coords: L.latLng(35.4920,-105.0568), type: 'County'},
        {name: "Sandoval", coords: L.latLng(35.6607,-106.8390), type: 'County'},
        {name: "Sierra", coords: L.latLng(33.1323,-107.1927), type: 'County'},
        {name: "Socorro", coords: L.latLng(33.9986,-106.9438), type: 'County'},
        {name: "Taos", coords: L.latLng(36.5676,-105.6439), type: 'County'},
        {name: "Torrance", coords: L.latLng(34.6309,-105.8330), type: 'County'},
        {name: "Union", coords: L.latLng(36.5254,-103.4575), type: 'County'},
        {name: "Valencia", coords: L.latLng(35.0389,-106.6811), type: 'County'},
    ]

    public onRegionSelected(selectedRegion: Region) {

        let regionSelection: RegionSelection = {
            coords: selectedRegion.coords,
            isProjectRegion: selectedRegion.type == 'ProjectArea' ? true : false
        }
        this.regionSelectionService.selectRegion(regionSelection)
    }
}