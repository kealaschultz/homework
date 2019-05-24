var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(queryUrl, function(data) {

  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + "Magnitude: " + (feature.properties.mag)+ "</p>");
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, coords) {
      function color(d) {
        return d > 6 ? "red" :
               d > 3  ? "magenta" :
                        "pink";
      }
  
      var geoMarkers = {
        radius: feature.properties.mag*7,
        fillColor: color(feature.properties.mag),
        color: "white",
        weight: .75,
        opacity: .75,
        fillOpacity: 0.75
      };
      return L.circleMarker(coords, geoMarkers);
    },
    onEachFeature: onEachFeature
  });


  createMap(earthquakes);
}

function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [darkmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


var legend = L.control({
	position: "bottomleft",
	fontColor: "white"
});

function color(c) {
  return c > 6 ? "red" :
         c > 3  ? "magenta" :
                  "pink";
}
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'legend'),
        quakeStrength = [0, 3, 6],
        labels = [];

    for (var i = 0; i < quakeStrength.length; i++) {
        div.innerHTML +=
            '<i style="background:' + color(quakeStrength[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            quakeStrength[i] + (quakeStrength[i + 1] ? '&ndash;' + quakeStrength[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);
}