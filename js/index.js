import { SlideDeck } from './slidedeck.js';

const map = L.map('map', {scrollWheelZoom: false}).setView([0, 0], 0);

map.dragging.disable();
map.scrollWheelZoom.disable();
map.doubleClickZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.touchZoom.disable();


const mapboxKey = 'pk.eyJ1Ijoiemh1aGFveXUiLCJhIjoiY21mZWNpcWNuMDIydDJscHdzZ2tybjhudiJ9.I0VnYRY6B6L7Np0K8LPH4g';
const mapboxStyle = 'mapbox/navigation-night-v1';

map.setView([30.25, 120.15], 12);

const baseTileLayer = L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxStyle}/tiles/256/{z}/{x}/{y}?access_token=${mapboxKey}`, {
  maxZoom: 16,
  attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
});
baseTileLayer.addTo(map);

// ## Interface Elements
const container = document.querySelector('.slide-section');
const slides = document.querySelectorAll('.slide');

var titleIcon = L.icon({
    iconUrl: 'data/park_label.png', 
    iconSize: [16, 16],               
    iconAnchor: [8, 8],            
    popupAnchor: [0, -32]           
});

const slideOptions = {
  'title-slide': {
    pointToLayer: (feature, latlng) => {
      if (feature.properties && feature.properties.year === 'title') {
        return L.marker(latlng, { icon: titleIcon });
      }
      return null;
    },
    style: (feature) => {
    if (feature.properties.name === '杭州中心城区 Central District of Hangzhou') {
      return {
        color: 'white',    
        fillColor: '#5e61fbf6', 
        fillOpacity: 0.2,
        dashArray: '4 2'
      };
    } else if (feature.properties.name === '杭州西湖风景名胜区 West Lake') {
      return {
        color: '#5efb85f6',     
        fillColor:  '#a3fdbaf8', 
        fillOpacity: 0.6,
        weight: 2,
        dashArray: '4 2'
      };
    }    return {};
  },
onEachFeature: (feature, layer) => {
  if (feature.properties.year === null) {
    layer.bindTooltip(feature.properties.name, {direction: 'bottom', className: 'permanent-tooltip'});
  }
  else if (feature.properties && feature.properties.year === 'title') {
    const popupContent = ` <div class="custom-popup">
    <h4>${feature.properties.name}</h4>
    ${feature.properties.image ? `<img src="${feature.properties.image}" class="popup-image"/>` : ''}
  </div>
`;
layer.bindPopup(popupContent);
 }
  }
},

  'first-slide': {
    pointToLayer: (feature, latlng) => {
      if (feature.properties && ['title', '1990'].includes(feature.properties.year)) {
        return L.marker(latlng, { icon: titleIcon });
      }
      return null;
    },
    style: (feature) => {
    if (feature.properties.leisure === null) {
      return {
        color: 'white',    
        fillColor: '#9798fffe',  
        fillOpacity: 0.5,
        interactive: false,
        weight: 2,
        dashArray: '4 2'
      };
    } else if (feature.properties.leisure !== null) {
      return {
        color: 'transparent',     
        fillColor: '#80ff00ff', 
        fillOpacity: 1,
        weight: 0   
      };
    }
  },
onEachFeature: (feature, layer) => {
  if (feature.properties.year === null) {
    layer.bindTooltip(feature.properties.name, {direction: 'bottom', className: 'permanent-tooltip'});
  }
  else if (feature.properties && ['title', '1990'].includes(feature.properties.year)) {
    const popupContent = ` <div class="custom-popup">
    <h4>${feature.properties.name}</h4>
    ${feature.properties.image ? `<img src="${feature.properties.image}" class="popup-image"/>` : ''}
  </div>
`;
layer.bindPopup(popupContent);
 }
  },
  },

  'second-slide': {
    pointToLayer: (feature, latlng) => {
      if (feature.properties && ['title', '1990', '2000'].includes(feature.properties.year)) {
        return L.marker(latlng, { icon: titleIcon });
      }
      return null;
    },
    style: (feature) => {
    if (feature.properties.leisure === null) {
      return {
        color: 'white',    
        fillColor: '#9798fffe',  
        fillOpacity: 0.5,
        interactive: false,
        weight: 2,
        dashArray: '4 2'
      };
    } else if (feature.properties.leisure !== null) {
      return {
        color: 'transparent',     
        fillColor: '#80ff00ff', 
        fillOpacity: 1,
        weight: 0   
      };
    }
  },
onEachFeature: (feature, layer) => {
  if (feature.properties.year === null) {
    layer.bindTooltip(feature.properties.name, {direction: 'bottom', className: 'permanent-tooltip'});
  }
  else if (feature.properties && ['title', '1990', '2000'].includes(feature.properties.year)) {
    const popupContent = ` <div class="custom-popup">
    <h4>${feature.properties.name}</h4>
    ${feature.properties.image ? `<img src="${feature.properties.image}" class="popup-image"/>` : ''}
  </div>
`;
layer.bindPopup(popupContent);
 }
  },
  },

  'third-slide': {
    pointToLayer: (feature, latlng) => {
      if (feature.properties && ['title', '1990', '2000', '2010'].includes(feature.properties.year)) {
        return L.marker(latlng, { icon: titleIcon });
      }
      return null;
    },
    style: (feature) => {
    if (feature.properties.leisure === null) {
      return {
        color: 'white',    
        fillColor: '#9798fffe',  
        fillOpacity: 0.5,
        interactive: false,
        weight: 2,
        dashArray: '4 2'
      };
    } else if (feature.properties.leisure !== null) {
      return {
        color: 'transparent',     
        fillColor: '#80ff00ff', 
        fillOpacity: 1,
        weight: 0   
      };
    }
  },
onEachFeature: (feature, layer) => {
  if (feature.properties.year === null) {
    layer.bindTooltip(feature.properties.name, {direction: 'bottom', className: 'permanent-tooltip'});
  }
  else if (feature.properties && ['title', '1990', '2000', '2010'].includes(feature.properties.year)) {
    const popupContent = ` <div class="custom-popup">
    <h4>${feature.properties.name}</h4>
    ${feature.properties.image ? `<img src="${feature.properties.image}" class="popup-image"/>` : ''}
  </div>
`;
layer.bindPopup(popupContent);
 }
  },
  },

  'fourth-slide': {
    pointToLayer: (feature, latlng) => {
      if (feature.properties && ['title', '1990', '2000', '2010','2020'].includes(feature.properties.year)) {
        return L.marker(latlng, { icon: titleIcon });
      }
      return null;
    },
    style: (feature) => {
    if (feature.properties.leisure === null) {
      return {
        color: 'white',    
        fillColor: '#9798fffe', 
        fillOpacity: 0.5,
        interactive: false,
        weight: 2,
        dashArray: '4 2'
      };
    } else if (feature.properties.leisure !== null) {
      return {
        color: 'transparent',     
        fillColor: '#80ff00ff', 
        fillOpacity: 1,
        weight: 0   
      };
    }
  },
onEachFeature: (feature, layer) => {
  if (feature.properties.year === null) {
    layer.bindTooltip(feature.properties.name, {direction: 'bottom', className: 'permanent-tooltip'});
  }
  else if (feature.properties && ['title', '1990', '2000', '2010','2020'].includes(feature.properties.year)) {
    const popupContent = ` <div class="custom-popup">
    <h4>${feature.properties.name}</h4>
    ${feature.properties.image ? `<img src="${feature.properties.image}" class="popup-image"/>` : ''}
  </div>
`;
layer.bindPopup(popupContent);
 }
  },
  },
};

// ## Legend
const legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML = `
    <h4>Legend</h4>
    <i style="background:#9798fffe; opacity:0.5; border:2px solid white;"></i> Boundary<br>
    <i style="background:#80ff00ff; opacity:1;"></i>   Parks<br>
    <img src="data/park_label.png" style="width:16px; height:16px; vertical-align:middle;"/>   Click it !
  `;
  return div;
};

legend.addTo(map);


// ## The SlideDeck object
const deck = new SlideDeck(container, slides, map, slideOptions);

document.addEventListener('scroll', () => deck.calcCurrentSlideIndex());

deck.preloadFeatureCollections();
deck.syncMapToCurrentSlide();
