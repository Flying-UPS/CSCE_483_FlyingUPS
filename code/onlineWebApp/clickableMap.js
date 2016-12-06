function initMap() {

  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(30.618880, -96.338647),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

  marker = new google.maps.Marker({
    position: {lat: 30.618880, lng: -96.338647},
    map: map
  });

  droneIcon = {
    url: "https://cdn3.iconfinder.com/data/icons/yachting-2/640/drone_icon-128.png",
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,0)
  }

  droneMarker = new google.maps.Marker({
    position: {lat: 30.618880, lng: -96.338647},
    map: map,
    icon: droneIcon
  });

  geocoder = new google.maps.Geocoder;

  google.maps.event.addListener(map, 'click', function(e) {

    geocoder.geocode({
      'location': e.latLng
    }, function(results, status) {
      if (status == 'OK') {

        marker.setPosition(e.latLng);
        document.getElementById('destination').value = "";

      }
      else {
        console.log('Error: Geocoder failure. Reason: ' + status);
      }
    });

  });
}