var socket = io();
socket.on("location", function(msg) {
	var latLng = {lat:parseFloat(msg.split(",")[0]), lng: parseFloat(msg.split(",")[1])}
	droneMarker.setPosition(latLng);
});

function submitAddress() {
	var destinationCoordinates = document.getElementById('destination').value;
	if (destinationCoordinates) {
		geocoder.geocode({
			'address': destinationCoordinates
		}, function(results, status) {
			if (status == 'OK') {
				map.center = results[0].geometry.location;
				marker.setPosition(results[0].geometry.location);
				window.alert("Package will be delivered to " + results[0].formatted_address + "\n at location " + results[0].geometry.location);
				socket.emit('send', results[0].geometry.location);
			}
			else {
	        	console.log('Error: Geocoder failure. Reason: ' + status);
	        	window.alert('Error: Address is incorrect.');
			}
		});
	} else {
		geocoder.geocode({
			'location': marker.position
		}, function(results, status) {
			if (status == 'OK') {
				window.alert("Package will be delivered to " + results[0].formatted_address + "\n at location " + results[0].geometry.location);
				socket.emit('send', results[0].geometry.location);
			}
			else {
	        	console.log('Error: Geocoder failure. Reason: ' + status);
			}
		});
	}
}