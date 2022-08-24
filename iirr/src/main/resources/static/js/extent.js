var extent;

const vectorSource = new ol.source.Vector();
const vectorLayer = new ol.layer.Vector({
	name: 'style',
	visible: true,
	source: vectorSource
	//style: IIRR.highlightStyle
});

var IIRR = {
	getDist: function() {
		var htmlString = "";
		var val = {
			state_id: $("#inputState").val()
		};

		$.ajax({
			url: 'api/district',
			type: 'post',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data) {
				//$('#target').html(data.msg);
				//console.log(data);
				htmlString = "<option value='0'>-- Select District--</option>";
				for (var i = 0; i < data.length; i++) {
					htmlString = htmlString + "<option value='" + data[i].district + "'>" + data[i].district + "</option>";
				}
				$("#inputDistrict").html(htmlString);
				IIRR.fitExtent($("#inputState option:selected").text(), $("#inputDistrict").val());
			},
			data: JSON.stringify(val)
		});
	},

	getDistExtent: function() {
		//console.log($("#inputState option:selected").text(), $("#inputDistrict").val());
		IIRR.fitExtent($("#inputState option:selected").text(), $("#inputDistrict").val());

	},

	highlightStyle: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: '#f00',
			width: 1
		}),
		fill: new ol.style.Fill({
			color: 'rgba(255,0,0,0.1)'
		}),
		text: new ol.style.Text({
			font: '14px Calibri,sans-serif',
			fill: new ol.style.Fill({
				color: '#000000'
			}),
			stroke: new ol.style.Stroke({
				color: '#FFFF99',
				width: 3.5
			})
		})
	}),

	getExtent: function(state, dist) {

		var formData = {};
		formData = {
			state_id: state.toUpperCase(),
			dist: dist.toUpperCase()
		};
		var Extent = $.ajax({
			type: "POST",
			contentType: "application/json",
			url: "api/bbox",
			data: JSON.stringify(formData),
			dataType: 'json',
			async: false,
			success: function(result) {
				if (result) {
					//console.log(result[0].extent);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("ERROR: ", jqXHR.responseJSON.error);
			}
		}).responseJSON;
		return (Extent.length != 0) ? Extent[0].extent : null;
	},

	getFeature: function(state, dist) {

		var formData = {};
		formData = {
			state_id: state.toUpperCase(),
			dist: dist.toUpperCase()
		};
		var Extent = $.ajax({
			type: "POST",
			contentType: "application/json",
			url: "api/feature",
			data: JSON.stringify(formData),
			dataType: 'json',
			async: false,
			success: function(result) {
				if (result) {
					//console.log(result);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("ERROR: ", jqXHR.responseJSON.error);
			}
		}).responseJSON;
		return (Extent.length != 0) ? Extent[0].extent : null;
	},

	fitExtent: function(st_val, dist_val) {
		/*extent = IIRR.getExtent(st_val, dist_val);
		extent = extent.replace('BOX(', '');
		extent = extent.replace(')', '');
		extent = extent.replace(',', ' ');
		//console.log(extent);
		const myArray = extent.split(" ");*/
		//console.log(myArray);
		//map.getView().fit(myArray, map.getSize());

		const feat = IIRR.getFeature(st_val, dist_val);
		//console.log(JSON.parse(feat));
		var format = new ol.format.GeoJSON();
		var feature = format.readFeatures(feat);
		vectorSource.clear();
		vectorSource.addFeatures(feature);
		//console.log(vectorSource.getFeatures());
		vectorLayer.setStyle(IIRR.highlightStyle);
		console.log(vectorLayer.getSource().getExtent());

		map.getLayers().forEach(layer => {
			if (layer && layer.get('name') === 'style') {
				map.removeLayer(layer);
			}
		});
		map.addLayer(vectorLayer);
		map.getView().fit(vectorLayer.getSource().getExtent(), map.getSize());
	}
	
	/*getDate: function() {
		var start = moment();
		var end = moment().add(250, 'days');

		var years = end.diff(start, 'year');
		start.add(years, 'years');

		var months = end.diff(start, 'months');
		start.add(months, 'months');

		var days = end.diff(start, 'days');

		console.log(years + ' years ' + months + ' months ' + days + ' days');

	}*/




}

