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
function geocodeAddress(e){ 
  if(e.keyCode == 13){
    console.log("Hi");
    address = document.getElementById("query").value;
    var geocoder = new google.maps.Geocoder();
    var request = {
      address: address
    };
    geocoder.geocode(request, function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        var latLng = results[0].geometry.location;
        handleGeocodeResult(latLng, address);
      } else {
        handleGeocodeFailure(address);
      }
    }); 
  } 
}

function handleGeocodeFailure(address) {
  
}
