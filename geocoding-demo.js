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
  log('Welcome to ' + address + '.');
  
  // - Make an infowindow on the marker, displaying the address.
  var addressBox = '<div id="content">'+
    address + '</div>';
  
  var infoWindow = new google.maps.InfoWindow({
    position: latLng,
    content: addressBox
  });
  infoWindow.open(map, marker);
  
  //window.alert(address + ': ' + latLng)
}

function log(msg) {
  var log = document.getElementById('log');
  log.innerHTML = log.innerHTML + '<div>' + msg + '</div>';
}

// TODO(florenciai): Write other functions to make geocoding work. When the
// geocoding is done, call handleGeocodeResult().
