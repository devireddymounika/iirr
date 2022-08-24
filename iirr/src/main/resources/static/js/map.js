/** script : openlayers  */


var view = new ol.View({
	center: ol.proj.transform([78.0, 23.0], 'EPSG:4326', 'EPSG:3857'),
	zoom: 4,

});
var view_ov = new ol.View({
	center: ol.proj.transform([78.0, 23.0], 'EPSG:4326', 'EPSG:3857'),
	zoom: 4,
});


var base_maps = new ol.layer.Group({
	'title': 'Base maps',
	layers: [
		new ol.layer.Tile({
			title: 'OSM',
			type: 'base',
			visible: true,
			source: new ol.source.OSM()
		}),
		/*new ol.layer.Tile({
			title: 'SatelliteLayer',
			type: 'base',
			visible: false,
			source: new ol.source.XYZ()
		}),*/
		new ol.layer.Tile({
			title: 'Google Map',
			type: 'base',
			visible: false,
			source: new ol.source.XYZ()
		}),
	]
});

var OSM = new ol.layer.Tile({
	source: new ol.source.OSM(),
	type: 'base',
	title: 'OSM',
});

var googleLayer = new ol.layer.Tile({
	source: new ol.source.XYZ({
		//attributions: [new ol.Attribution({ html: '<a href=""></a>' })],
		url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'
	})
});

/*var tileLayer = new ol.layer.Tile({
	source: new ol.source.XYZ({
		attributions: ['Powered by Esri',
			'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'],
		attributionsCollapsible: false,
		url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		maxZoom: 23
	})
});*/

var overlays = new ol.layer.Group({
	'title': 'Overlays',
	visible: false,
	layers: [
		new ol.layer.Image({
			title: 'district',
			// extent: [-180, -90, -180, 90],
			source: new ol.source.ImageWMS({
				url: 'http://localhost:8080/geoserver/India_maps/wms',
				params: { 'LAYERS': 'India_maps:district' },
				ratio: 1,
				serverType: 'geoserver'
			})
		}),
		new ol.layer.Image({
			title: 'state',
			// extent: [-180, -90, -180, 90],
			source: new ol.source.ImageWMS({
				url: 'http://localhost:8080/geoserver/India_maps/wms',
				params: { 'LAYERS': 'India_maps:state' },
				ratio: 1,
				serverType: 'geoserver'
			})
		}),

	]
});


var map = new ol.Map({
	target: 'map',
	view: view,
});

map.addLayer(googleLayer);
map.addLayer(base_maps);
map.addLayer(overlays);

var mouse_position = new ol.control.MousePosition();
map.addControl(mouse_position);

var overview = new ol.control.OverviewMap({
	view: view_ov,
	collapseLabel: 'O',
	label: 'O',
	layers: [OSM]
});
map.addControl(overview);

var full_sc = new ol.control.FullScreen({ label: 'F' });
map.addControl(full_sc);

var zoom = new ol.control.Zoom({ zoomInLabel: '+', zoomOutLabel: '-' });
map.addControl(zoom);

var zoomslider = new ol.control.ZoomSlider();
map.addControl(zoomslider);
var scaleLine = new ol.control.ScaleLine();
map.addControl(scaleLine);

var zoom_ex = new ol.control.ZoomToExtent({
	extent: [
		8443213.761173025, 4952493.942267804, 8687812.25168559, 363826.2602521032
	]
});
map.addControl(zoom_ex);

var layerSwitcher = new ol.control.LayerSwitcher({
	activationMode: 'click',
	startActive: false,
	tipLabel: 'Layers', // Optional label for button
	groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
	collapseTipLabel: 'Collapse layers',
});
map.addControl(layerSwitcher);

/*function legend () {
	
//	$('#legend').empty();
	
var no_layers = overlays.getLayers().get('length');
	
var head = document.createElement("h4");
	
var txt = document.createTextNode("Legend");
	
head.appendChild(txt);
var element = document.getElementById("legend");
element.appendChild(head);
var ar = [];
var i;
for (i = 0; i < no_layers; i++) {
ar.push("http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+overlays.getLayers().item(i).get('title'));
//alert(overlays.getLayers().item(i).get('title'));
}
for (i = 0; i < no_layers; i++) {
var head = document.createElement("p");
	
var txt = document.createTextNode(overlays.getLayers().item(i).get('title'));
//alert(txt[i]);
head.appendChild(txt);
var element = document.getElementById("legend");
element.appendChild(head);
 var img = new Image();
img.src = ar[i];
 
var src = document.getElementById("legend");
src.appendChild(img);
 
}
 
}
 
legend();*/






