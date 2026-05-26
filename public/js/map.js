// coordinates = [longitude, latitude]

const longitude = coordinates[0];
const latitude = coordinates[1];

  const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// Create map
const map = L.map("map").setView([latitude, longitude], 12);

// Tile layer
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap contributors & CARTO'
  }
).addTo(map);

// Marker
L.marker([latitude, longitude], { icon: redIcon })
  .addTo(map)
  .bindPopup(listingTitle)
  .openPopup();

