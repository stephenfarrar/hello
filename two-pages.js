//THE GLOBAL VARIABLES

//object to store lesson information
function Lesson(title, blurb, divID) {
  this.title: title;
  this.blurb: blurb;
  this.divID: divID;
  this.update = function() {};
  this.refresh = function() {};
}

//THE LESSONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//THIS NEEDS TO BE UPDATED EVERYTIME THERE ARE NEW LESSONS
//initialise introduction
var lesson0 = new Lesson("Tutorial", "Welcome to our interactive Google Maps API demo tutorial!<br>Please select a lesson from the bottom left by clicking a button.<br>Enjoy!", "lesson0-intro");
lesson0.refresh = refreshIntro;
lesson0.update = refreshIntro;

//initialise marker events
var lesson1 = new Lesson("Marker Events", "Marker Events:<br> In this tutorial, you can use the map given " + "to create a new marker icon when the map is clicked.<br>" + "These icons can by customised to be different colours, as seen below.");
lesson1.refresh = refreshMarker;
lesson1.update = updateMarker;

//initialise geocoding
var lesson2 = new Lesson("Geocoding", "Geocoding:<br> Geocoding is a feature of maps that correlates " + "an address (or part of an address) with its geographic coordinates. <br>" + "Try typing an address in the box on the bottom right!");
lesson2.refresh = refreshGeo;
lesson2.update = updateGeo;

//THE LESSONS ARRAY
var lessonArray = [lesson0, lesson1, lesson2];

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//INITIALIZE THE MAPS
//NEEDS TO BE UPDATED IN EACH LESSON -> EACH LESSON WILL HAVE ITS OWN MAP
var mapGeo = 0;
var mapMarker = 0;
var map = 0;

//INFORMATION ABOUT THE LESSON THAT IS ACTIVE -> NEED TO BE UPDATED IN EACH REFRESH/UPDATE FUNCTIONS
var activeIndex = 0;

//COLOURFUL MAP ICONS
var iconColours = [
  "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/green-dot.png"];

//FINDING ALL THE LESSONS OBJECT
var lessonsClass = document.getElementByClassName("lesson");

//VARYING BUTTON HOVER COLORS
var color = ['red', 'blue', 'purple'];



google.maps.event.addDomListener(window, 'load', function initialize() 
  //CREATING BUTTONS
  for (var i=0; i<lessonsClass.length; i++){
    makeButton(lessonClass[i].id, i);
  }
  
  //create refresh button
  var button = document.getElementById("buttons");
  button.innerHTML = button.innerHTML + "<input type=\"button\" id=\"refresh\" value=\"refresh\" onclick=\"refresh()\"></input><br>"
  var buttonProp = document.getElementById("refresh");
  buttonSyle (buttonProp, lessonsClass.length);

  //Set the initial page to be introduction
  lessonArray[0].refresh;
});

function makeButton(string, i){
  var button = document.getElementById("buttons");
  button.innerHTML = button.innerHTML + "<input type=\"button\" id=" +string + "value=" + string + "onclick=\"lessonArray[i].update\"></input><br>";
  var buttonProp = document.getElementById(string);
  buttonSyle (buttonProp, i);
}

function buttonStyle(buttonProp, i){
  buttonProp.style.background-color = 'yellow';
  buttonProp.style.width = '150px';
  buttonProp.style.height = '40px';
  buttonProp.style.font-size = '25px';
  buttonProp.style.opacity = 0.8;
  buttonProp.style.font-weight = 'bold';
  buttonProp.onmouseover = function(){
    buttonProp.style.background-color = color[i%color.length];
    buttonProp.style.color = white;
  }
}

//UPDATE THIS!
function refresh(){
  if(document.title == "Marker Events"){
    buttonMarker();
  } else if (document.title == "Geocoding"){
    geoButton();
  } else {
    hideAll();
    document.getElementById("map-canvas-initial").style.display = "block";
  }
}

//BLOCKING ALL DIVS AUTOMATICALLY
function hideAll() {
  for (var i=0; i<lessonsClass.length; i++){
    document.getElementById(lessonsClass[i].id).style.display = "none";
  }
}


//function to update marker
function updateMarker(){
  hideAll();
  if (mapMarker === 0) {
     document.getElementById("map-canvas-marker").style.display = "block";
     refreshMarker();
  } else {
    document.title = "Marker Events";
    document.getElementById("logMarker").style.display = "block";
    document.getElementById("map-canvas-marker").style.display = "block";
    document.getElementById("instructions").innerHTML = "Marker Events:<br> In this tutorial, you can use the map given " +
                           "to create a new marker icon when the map is clicked.<br>" +
                           "These icons can by customised to be different colours, as seen below.";
  }
}

//function to refresh marker
function refreshMarker(){
  
  mapMarker = new google.maps.Map(document.getElementById('map-canvas-marker'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
 
  hideAll();
  document.title = "Marker Events";
  document.getElementById("instructions").innerHTML = "Marker Events:<br> In this tutorial, you can use the map given " +
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
	var logMarkerdiv = document.getElementById('logMarker');
  logMarkerdiv.innerHTML = 'Log:';


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
  if (mapGeo === 0){
    document.getElementById("map-canvas-geo").style.display = "block";
    geoButton();
  } else {
    hideAll();
    document.title = "Geocoding";
    document.getElementById("instructions").innerHTML = "Geocoding:<br> Geocoding is a feature of maps that correlates " + "an address (or part of an address) with its geographic coordinates. <br>" +   "Try typing an address in the box on the bottom right!";
    document.getElementById("query").style.display = "block";
    document.getElementById("logGeo").style.display = "block";
    document.getElementById("map-canvas-geo").style.display = "block";
  }
}

//function to refresh Geo
function refreshGeo(){
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
   document.getElementById("instructions").innerHTML = "Geocoding:<br> Geocoding is a feature of maps that correlates " + "an address (or part of an address) with its geographic coordinates. <br>" + "Try typing an address in the box on the bottom right!";
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
          handleGeocodeResult(latLng, results[0].formatted_address);
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
    logGeoAdd (result[i].formatted_address);
  }
  logGeoAdd('<br>Please refine your search.');
}

