function handleGeocodeResult(latLng, address) {
  // TODO(olrichandrea): Write this function.
  // - Place a marker on the map.
  // - Write something in the log.
  // - Make an infowindow on the marker, displaying the address.

  window.alert(address + ': ' + latLng);
}

function log(msg) {
  var log = document.getElementById('log');
  log.innerHTML = log.innerHTML + '<div>' + msg + '</div>';
}

// TODO(florenciai): Write other functions to make geocoding work. When the
// geocoding is done, call handleGeocodeResult().
