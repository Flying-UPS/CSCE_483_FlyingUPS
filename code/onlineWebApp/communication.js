var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('.'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('User connected');


	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	// Send the coordinates from web app to MissionPlanner
	socket.on('send', function(msg) {
		console.log('Received coordinates: ' + msg.lat + ", " + msg.lng);
		io.emit('send', msg);
	});

	socket.on('location', function(msg) {
		io.emit('location', msg);
	});
});

function requestPosition() {
	console.log('Requesting location.');
	io.sockets.emit('request', 'request')
}

setInterval(requestPosition, 5000);

server.listen(8080, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening on ' + host + ":" + port);
});