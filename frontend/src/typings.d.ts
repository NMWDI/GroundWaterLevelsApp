import * as L from 'leaflet'
declare module 'leaflet' {
    function canvasIconLayer(options:any)

    class CanvasIconLayer extends Layer {
        public addLayers(markers: L.Marker[])
        public removeLayer(marker: L.Marker)
    }

    function pixiOverlay(utils: any, container: any)
}

declare global {
    interface Window {
        wellModalService: any
    }
}
