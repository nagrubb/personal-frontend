function createMap(id, geoJsonData) {
  var map = L.map(id, {
    minZoom: -1,
    maxZoom: 1.0,
    dragging: false,
    zoomControl: false,
    maxBoundViscosity: 0,
    maxBounds: [[45, 0],[45,0]]
  }).setView([45, 0], 0);

  L.control.scale({maxWidth: 100}).addTo(map);

  map.on('resize', function(e) {
      map.fitWorld({reset: true}).zoomIn();
  });

  map.fitWorld({reset: true}).zoomIn();

  L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 1.0,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  var info = L.control();

  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function(props) {
    if (props) {
      this._div.innerHTML = '<b>' + props.name + '</b><br />';
      this._div.style.visibility = 'visible';
    } else {
      this._div.innerHTML = "";
      this._div.style.visibility = 'hidden';
    }
  };

  info.addTo(map);

  var geojson = L.geoJson(geoJsonData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  function style(feature) {
    if (feature.properties.visited) {
      color = "#2196F3";
    } else {
      color = "#f1f1f1";
    }

    return {
      weight: 2,
      opacity: 1,
      color: color,
      dashArray: '1',
      fillOpacity: 1.0,
      fillColor: color
    };
  }

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 1,
      color: '#757575',
      dashArray: '',
      fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
    });
  }
}
