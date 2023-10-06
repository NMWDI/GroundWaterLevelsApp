# Frontend Documentation
The frontend of this application shows various statistics and a map with features that pertain to the New Mexico Bureau of Groundwater Management.

The top level structure of this application's modules is described in the readme, the most relevant part of this is the "features" module, more specifically the "features/groundwater-map" directory which contains the component for the leaflet map and all other informational components that surround it, along with some specific styling and interfaces. The contents of "features/groundwater-map" are described below.
- **components**: The angular components that make up the groundwater map page (the only page at the moment).
	- *-widget: Components that show quick data about the state of groundwater in NM.
	- groundwater-map-layout: Defines the layout of the components on the groundwater-map page.
	- region-selection: The region selection boxes that are added to the map and notify the region-selection service when an option is clicked.
	- well-modal: A modal with more in depth information about the currently selected well.
	- leaflet-map: The map that shows and allows interaction with wells and regions.
- **interfaces**: TS interfaces for groundwater map specific data.
- **markers**: Visual specifications of the leaflet markers that represent wells.
- **overlay-styles**: Styles for the various overlays and features that show up on the map.
- **services**: Services that handle processing or giving data to the map component.

## leaflet-map
This is the most complex component, a high level overview of how it works is described below.

First, a div is defined in the HTML file that serves as a point for the leaflet plugin to hook into and use for displaying the map.  The TS file then handles the rest of the logic.

When the component is initialized, the constructor gets instances of a few services then subscribes to the regionSelectionService which will tell the map the coordinates of the region the user selected from the region-selection component, and once these coordinates are received the map will move and zoom to them.

Next, initMap() will be called by the ngAfterViewInit hook. This function initializes the map, adds various controls, and adds the features that will appear on the map, these actions are commented on generously in the code.

## Use of Leaflet.PixiOverlay
Leaflet.PixiOverlay is a plugin that allows drawing Leaflet overlays using PixiJS, "a JavaScript library for drawing using WebGL that seamlessly falls back to HTML5's canvas if needed". This plugin is used to performantly plot and dynamically scale the 1000+ well markers present on the map.

The implementation of this plugin is commented on (in leaflet-map) but essentially it functions by:
- Adding a new layer to the map
- Generating the well points based on the location and trend from the geoJSON
  - This step also describes the popup to open when a given point is clicked, based on other data from the geoJSON
- After the map is added, any zoom events will trigger the recalculation of each marker's correct scale
- An update loop is used to trigger a redraw event on every frame, if the markers are not at the zoom-appropriate scale, the redraw loop will smoothly transition them to it over each frame
