var mapGeo;
var mapMarker;
var iconColours = [
  "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/green-dot.png"];

google.maps.event.addDomListener(window, 'load', function initialize() {
  
  mapGeo =new google.maps.Map(document.getElementById('map-canvas-geo'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  buttonMarker();
  
  
});

function refresh(){
  if(document.title == "Marker Events"){
    buttonMarker();
  } else {
    geoButton();
  }
}
function hideAll() {
  document.getElementById("query").style.display = "none";
  document.getElementById("logGeo").style.display = "none";
  document.getElementById("logMarker").style.display = "none";
  document.getElementById("map-canvas-marker").style.display = "none";
  document.getElementById("map-canvas-geo").style.display = "none";
}
//function to update marker
function updateMarker(){
  hideAll();
  document.title = "Marker Events";
  document.getElementById("logMarker").style.display = "block";
  document.getElementById("map-canvas-marker").style.display = "block";
}

//function to refresh marker
function buttonMarker(){
  
  mapMarker = new google.maps.Map(document.getElementById('map-canvas-marker'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
 
  hideAll();
  document.title = "Marker Events";
  instructions.innerHTML = "Marker Events:<br> In this tutorial, you can use the map given " +
                           "to create a new marker icon when the map is clicked.<br>" +
                           "These icons can by customised to be different colours, as seen below.";
  document.getElementById("logMarker").style.display = "block";
  document.getElementById("map-canvas-marker").style.display = "block";
  
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(-33.87, 151.21),
    draggable: true,
    map: mapMarker
  });
  //refresh the log
	var logMarker = document.getElementById('logMarker');
  logMarker.innerHTML = 'Log:';


  ['click', 'dblclick', 'mouseover', 'mouseout', 'mousedown', 'mouseup',
   'rightclick'].forEach(function(event) {
    google.maps.event.addListener(marker, event, function() {
      logMarker(event);
    });
  });
				
  //adding new markers on every place clicked on the map
  var i = 0;
  google.maps.event.addListener(mapMarker, 'click', function(pos){
    createNewMarker(pos.latLng, ++i);
  });			
}
	
function createNewMarker(pos, i){
  i = i % 5;
  var markerOptions = {
    position: pos,
    map: mapMarker,
    draggable: true
  };
        
  var newMarker = new google.maps.Marker(markerOptions);
  newMarker.setIcon(iconColours[i]);

  ['click', 'dblclick', 'mouseover', 'mouseout', 'mousedown', 'mouseup',
   'rightclick'].forEach(function(event) {
    google.maps.event.addListener(newMarker, event, function() {
      logMarker(event);
    });
  });      
}
			
function logMarker(msg) {
  var logMarker = document.getElementById('logMarker');
  logMarker.innerHTML = logMarker.innerHTML + '<div>' + msg + '</div>';
}

//************************ GEOCODE FUNCTIONS ***************************//

//function to update Geo
function updateGeo(){
  hideAll();

  document.title = "Geocoding";
  document.getElementById("query").style.display = "block";
  document.getElementById("logGeo").style.display = "block";
  document.getElementById("map-canvas-geo").style.display = "block";
}

//function to refresh Geo
function geoButton(){
  mapGeo = new google.maps.Map(document.getElementById('map-canvas-geo'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  hideAll();
  //document.getElementById("logMarker").style.display = "none";
 // document.getElementById("map-canvas-marker").style.display = "none";
	//refreshing the logs and the query
  var logGeo = document.getElementById('logGeo');
  logGeo.innerHTML = 'Please Enter The Address Below:';
  var query = document.getElementById('query');
  query.value = ' ';

  document.title = "Geocoding";
  instructions.innerHTML = "Geocoding:<br> Geocoding is a feature of maps that correlates " + "an address (or part of an address) with its geographic coordinates. <br>" + "Try typing an address in the box on the bottom right!";
  document.getElementById("query").style.display = "block";
  document.getElementById("logGeo").style.display = "block";
  document.getElementById("map-canvas-geo").style.display = "block";
}

function handleGeocodeResult(latLng, address) {
  // TODO(olrichandrea): Write this function.
  //move to spot
  mapGeo.panTo(latLng);
  // - Place a marker on the map.
  var marker = new google.maps.Marker({
	  position: latLng,
    map: mapGeo
	});
  
  // - Write something in the log.
  logGeo('Welcome to ' + address + '.');
  
  // - Make an infowindow on the marker, displaying the address.
  var addressBox = '<div id="content">'+
    address + '</div>';
  
  var infoWindow = new google.maps.InfoWindow({
    position: latLng,
    content: addressBox
  });
  infoWindow.open(mapGeo, marker);
}

function logGeo(msg) {
  var logGeo = document.getElementById('logGeo');
  logGeo.innerHTML = '<div>' + msg + '</div>';
}

function logGeoAdd(msg) {
  var logGeoAdd = document.getElementById('logGeo');
  logGeoAdd.innerHTML = logGeoAdd.innerHTML+'<div>' + msg + '</div>';
}

function logGeoInLine(msg) {
  var logGeoInLine = document.getElementById('logGeo');
  logGeoInLine.innerHTML = logGeoInLine.innerHTML+' ' + msg;
}

// TODO(florenciai): Write other functions to make geocoding work. When the
// geocoding is done, call handleGeocodeResult().

function geocodeAddress(e){
  //if the user press enter 
  if(e.keyCode == 13){
    //get the address
    address = document.getElementById("query").value;
    
    //create the geocode
    var geocoder = new google.maps.Geocoder();
    var request = {
      address: address
    };

    geocoder.geocode(request, function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        //if there is multiple result
        if(results.length>1){
          handleMultipleResults(address, results);
        } else {
          //only one result
          var latLng = results[0].geometry.location;
          handleGeocodeResult(latLng, address);
        }
      } else {
        //not a valid address
        handleGeocodeFailure(address);
      }
    }); 
  } 
}

//function to handle invalid input
//i.e. when geocode returns NO result
function handleGeocodeFailure(address) {
  logGeo('Sorry, ' + address + ' is not a valid address');
}

//function to handle multiple results

function handleMultipleResults(address, result) {
  logGeo('Sorry, your query "' + address + '" returned multiple results:<br>');
  for (var i = 0; i<result.length; i++) {
    for (var j = 0; j<result[i].address_components.length; j++){
      logGeoInLine (result[i].address_components[j].long_name);
    }
     logGeoInLine("<br>"); 
  }
  logGeoAdd('<br>Please refine your search.');
}

