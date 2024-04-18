//JavaScript controls the interactivity and functionality of web pages by enabling dynamic manipulation of content, handling user interactions, and facilitating communication with servers.

// Loads map
// L is  part of the Leaflet library. Leaflet is an open-source JavaScript library used for interactive maps. 
//It provides functionalities for displaying maps, adding markers, polygons, and other shapes, as well as handling user interactions like panning and zooming.
//'map': is the ID of the HTML element where we want to display the map. In this case, it's assumed that we have an HTML element with the ID 'map', such as <div id="map"></div>.
var map = L.map('map', {
  center: [40.708020, -73.986775],
  zoom: 11,
  zoomControl: false
});

// Add zoom control
// .addTo(map): adds the zoom control to the specified map. The addTo() method is used to add the control to the map instance created earlier and stored in the variable map.
L.control.zoom({
  position: 'topright'
}).addTo(map);

// Add tile layer
//L.tileLayer() creates a tile layer. Tile layers are used to display map data from different sources, such as raster images or vector tiles.
//'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' is the URL template for the tile layer. It specifies where Leaflet should 
//fetch the tiles from. {s}, {z}, {x}, and {y} are placeholders for the tile server subdomain, zoom level, horizontal coordinate, and vertical coordinate, respectively. 
//This URL template is for Stamen TonerLite tiles which is the specific style of base map.
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// FIRE STATIONS
// Load fire stations
//var features = FireStations.features; initializes a variable named features and assigns it the value of FireStations.features. 
//FireStations.features references the js file named FireStations with a property named features we called in the HTML code. 
var features = FireStations.features;
//Map iterates over each element of the array and applies a function to each element, returning a new array with the results.
//Object.values(feature) returns an array containing the values of the properties of the feature object.
var newArray = features.map(function(feature) {
  return Object.values(feature);
});

// Create functions to add and remove fire station markers from map
//The function is saying to iterate over each marker and add it to the map, or remove from the map.
function addToMap() {
  markers.forEach(function(marker) {
    marker.addTo(map);
  });
}

function removeMap() {
  markers.forEach(function(marker) {
    map.removeLayer(marker);
  });
}

// Create a variable containing the markers of the fire stations ready to be added to our map
//newArray.map(element => ...) uses the map method to iterate over each element in the newArray array we created earlier.
// For each element, it executes the provided function.
// L.marker([...], {...}) creates a new Leaflet marker. It takes two arguments:
//The first argument is an array [latitude, longitude] specifying the geographical coordinates of the marker's location. 
//In this case, the latitude is accessed from element[2].coordinates[1] and the longitude from element[2].coordinates[0]. These can be found in the fire station geojson (now in our newArray)
//The second argument is an options object that configures the marker. Here, it specifies the icon to use for the marker using L.icon({...})
//.bindPopup(...) binds a popup to the marker. It takes a string parameter that represents the content of the popup. 
//In this case, it binds a popup containing the name of the fire station, accessed from element[1].FacilityName.
var markers = newArray.map(element =>
  L.marker([element[2].coordinates[1], element[2].coordinates[0]], { icon: L.icon({ iconUrl: 'images/fire-station.png', iconSize: [25, 25] }) }).bindPopup("Name: " + element[1].FacilityName));

// Hide and show fire station markers
//if (map.hasLayer(markers[0])) { ... }: This conditional statement uses the hasLayer method to check if the specified layer (marker) is currently added to the map.
//If the layer has markers it calls our previously defined removeMap function, if it doesn't have markers it calls our previously defined addToMap function.
function showFireStations() {
  if (map.hasLayer(markers[0])) {
    removeMap();
  } else {
    addToMap();
  }
}

// Show home page
// This creates a function that takes us to the C2Smarter home page. 
//Window.location is an object that represents the current URL of the browser window.
//The href property of window.location specifies the entire URL of the current page.
//By setting window.location.href to a new URL, the browser is instructed to navigate to that URL.
function showHome() {
  window.location.href = 'https://c2smarter.engineering.nyu.edu/';
}

// Show and hide modal
//We can access and control html elements from within inside the js code.
//var x = document.getElementById("modal"); retrieves the HTML element with the ID "modal" using document.getElementById(). 
//It assigns the reference to this element to the variable x.
//x.style.display = x.style.display === 'block' ? 'none' : 'block'; checks if the current display style of the modal element is 'block' using x.style.display === 'block'. 
//If it is, it sets the display style to 'none', effectively hiding the modal. If not, it sets the display style to 'block', showing the modal.
function showModal() {
  var x = document.getElementById("modal");
  x.style.display = x.style.display === 'block' ? 'none' : 'block';
}
//x.style.display = "none"; sets the display style of the modal element to 'none', effectively hiding the modal.
function byeModal() {
  var x = document.getElementById("modal");
  x.style.display = "none";
}