//THE GLOBAL VARIABLES

//object to store lesson information
function Lesson(title, blurb, divID) {
  this.title = title;
  this.blurb = blurb;
  this.divID = divID;
  this.update = function() {};
  this.refresh = function() {};
}

//THE LESSONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//THIS NEEDS TO BE UPDATED EVERYTIME THERE ARE NEW LESSONS
//initialise introduction
var lesson0 = new Lesson("Introduction", "Welcome to our interactive Google Maps API demo tutorial!<br>Please select a lesson from the bottom left by clicking a button.<br>Enjoy!", "lesson0-intro");
lesson0.refresh = refreshIntro;
lesson0.update = refreshIntro;

//initialise marker events
var lesson1 = new Lesson("Marker Events", "Marker Events:<br> In this tutorial, you can use the map given " + "to create a new marker icon when the map is clicked.<br>" + "These icons can by customised to be different colours, as seen below.", "lesson1-marker");
lesson1.refresh = refreshMarker;
lesson1.update = updateMarker;

//initialise geocoding
var lesson2 = new Lesson("Geocoding", "Geocoding:<br> Geocoding is a feature of maps that correlates " + "an address (or part of an address) with its geographic coordinates. <br>" + "Try typing an address in the box on the bottom right!", "lesson2-geocoding");
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
var lessonsClass = document.getElementsByClassName("lesson");

//VARYING BUTTON HOVER COLORS
//YOU CAN ADD MORE COLORS
var color = ['red', 'blue', 'purple'];

//**********************START OF FUNCTIONS + MAIN FUNCTIONS*******************//
google.maps.event.addDomListener(window, 'load', function initialize(){
  //Creating buttons
  for (var i=0; i<lessonsClass.length; i++){
    makeButton(lessonsClass[i].id, i);
  }

  //Create refresh button
  var button = document.getElementById("buttons");
  var newButton = document.createElement("input");
  newButton.type = "button";
  newButton.id = "refresh";
  newButton.value = "Refresh";
  newButton.onclick = function(){
    refresh();
  };
  button.appendChild(newButton);
  var buttonElement = document.getElementById("refresh");
  buttonStyle (buttonElement, lessonsClass.length);

  //Set the initial page to be introduction
  lessonArray[0].refresh();
});

function makeButton(string, i){
  var button = document.getElementById("buttons");
  var newButton = document.createElement("input");
  newButton.type = "button";
  newButton.id = string+"button";
  newButton.value = lessonArray[i].title;
  newButton.onclick = function(){
    lessonArray[i].update()
  };
  button.appendChild(newButton);
  button.appendChild(document.createElement("br"));
  var buttonElement = document.getElementById(string+"button");
  buttonStyle(buttonElement, i);
}

function buttonStyle(buttonProp, i){
  buttonProp.style.display = ' ';
  buttonProp.style.backgroundColor = 'yellow';
  buttonProp.style.width = '150px';
  buttonProp.style.height = '40px';
  buttonProp.style.fontSize = '20px';
  buttonProp.style.opacity = 0.8;
  buttonProp.style.fontWeight = 'bold';
  buttonProp.style.color = 'black';
  buttonProp.onmouseover = function(){  
    buttonProp.style.backgroundColor = color[i%color.length];
    buttonProp.style.color = 'white';
  }
  buttonProp.onmouseout = function(){
    buttonProp.style.backgroundColor = 'yellow';
    buttonProp.style.color = 'black';
  }
}

function refresh(){
  document.getElementById(lessonArray[activeIndex].divID).style.display = "block";
  document.title = lessonArray[activeIndex].title;
  document.getElementById("instructions").innerHTML = lessonArray[activeIndex].blurb;
  lessonArray[activeIndex].refresh();
}

//BLOCKING ALL DIVS AUTOMATICALLY
function hideAll() {
  for (var i=0; i<lessonsClass.length; i++){
    document.getElementById(lessonsClass[i].id).style.display = "none";
  }
}

//************************ INTRODUCTION FUNCTIONS ****************************//
function refreshIntro(){
  hideAll();
  activeIndex = 0;
  document.title = lessonArray[activeIndex].title;
  document.getElementById(lessonArray[activeIndex].divID).style.display = "block";
  document.getElementById("instructions").innerHTML = lessonArray[activeIndex].blurb;
  map = new google.maps.Map(document.getElementById('map-canvas-initial'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
 
}

//************************ MARKER EVENTS FUNCTIONS ***************************//

//function to update marker
function updateMarker(){
  hideAll();
  activeIndex = 1;
  document.getElementById(lessonArray[activeIndex].divID).style.display = "block";
  document.title = lessonArray[activeIndex].title;
  document.getElementById("instructions").innerHTML = lessonArray[activeIndex].blurb;
  if (mapMarker === 0) {
    refreshMarker();
  }
}

//function to refresh marker
function refreshMarker(){
  //refresh the map
  hideAll();
  document.getElementById(lessonArray[activeIndex].divID).style.display = "block";
  document.title = lessonArray[activeIndex].title;
  document.getElementById("instructions").innerHTML = lessonArray[activeIndex].blurb;
  mapMarker = new google.maps.Map(document.getElementById('map-canvas-marker'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
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

//*************************** GEOCODE FUNCTIONS ******************************//

//function to update Geo
function updateGeo(){
  hideAll();
  activeIndex = 2;
  document.getElementById(lessonArray[activeIndex].divID).style.display = "block";
  document.title = lessonArray[activeIndex].title;
  document.getElementById("instructions").innerHTML = lessonArray[activeIndex].blurb;
  if (mapGeo === 0){
    refreshGeo();
  }
}

//function to refresh Geo
function refreshGeo() {
  mapGeo = new google.maps.Map(document.getElementById('map-canvas-geo'), {
    zoom: 12,
    center: new google.maps.LatLng(-33.8683, 151.2086),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  //refreshing the logs and the query
  var logGeo = document.getElementById('logGeo');
  logGeo.innerHTML = 'Please Enter The Address Below:';
  var query = document.getElementById('query');
  query.value = ' ';
}

function handleGeocodeResult(latLng, address) {
  // - Move to spot
  mapGeo.panTo(latLng);
  // - Place a marker on the map.
  var marker = new google.maps.Marker({
    position: latLng,
    map: mapGeo
  });
  // - Write something in the log.
  logGeo('Welcome to ' + address + '.');
  // - Make an infowindow on the marker, displaying the address.
  var addressBox = '<div id="content">'+ address + '</div>';
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

function geocodeAddress(e){
  activeIndex = 2;
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
