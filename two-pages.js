var map;
var iconColours = [
  "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/green-dot.png"];

google.maps.event.addDomListener(window, 'load', function initialize() {

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  buttonMarker();
  
});

function hideAll() {
  document.getElementById("query").style.display = "none";
  document.getElementById("logGeo").style.display = "none";
  document.getElementById("logMarker").style.display = "none";
}

function buttonMarker(){
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  hideAll();
  document.title = "Marker Events";
  document.getElementById("logMarker").style.display = "block";
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(-33.87, 151.21),
    draggable: true,
    map: map
  });
				
  ['click', 'dblclick', 'mouseover', 'mouseout', 'mousedown', 'mouseup',
   'rightclick'].forEach(function(event) {
    google.maps.event.addListener(marker, event, function() {
      logMarker(event);
    });
  });
				
  //adding new markers on every place clicked on the map
  var i = 0;
  google.maps.event.addListener(map, 'click', function(pos){
    createNewMarker(pos.latLng, ++i);
  });			
}
	
function createNewMarker(pos, i){
  i = i % 5;
  var markerOptions = {
    position: pos,
    map: map,
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

function geoButton(){
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  hideAll();
  document.title = "Geocoding";
  document.getElementById("query").style.display = "block";
  document.getElementById("logGeo").style.display = "block";
}

function handleGeocodeResult(latLng, address) {
  // TODO(olrichandrea): Write this function.
  //move to spot
  map.panTo(latLng);
  // - Place a marker on the map.
  var marker = new google.maps.Marker({
	  position: latLng,
    map: map
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
  infoWindow.open(map, marker);
}

function logGeo(msg) {
  var logGeo = document.getElementById('logGeo');
  logGeo.innerHTML = '<div>' + msg + '</div>';
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
          handleMultipleResults(address);
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

//possible function to handle multiple results?

function handleMultipleResults(address) {
  alert('Sorry, your query - ' + address + ' - returned multiple results');
  logGeo('Please refine your search.');
}

