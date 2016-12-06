import sys
# sys.path.append(r"C:\Python27\lib")
sys.path.append(r"C:\Python27\Lib\site-packages")
# import clr
import logging
import time
# import MissionPlanner

import socket

from socketIO_client import SocketIO, LoggingNamespace

logging.getLogger('socketIO-client').setLevel(logging.DEBUG)

HOST = 'localhost'
PORT = 50001
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


# clr.AddReference("MissionPlanner.Utilities")
# print "Starting Mission"
# Script.ChangeMode("Guided")
# print "Guided Mode"
print "Connecting to localhost"

# Listen to online web server
with SocketIO('localHost', 8080, LoggingNamespace) as socketIO:

	# On connection
	def on_connect(*args):
		s.connect((HOST, PORT))
		print "Connected! ", args

	# Receive coordinates from web app
	def on_send(*args):
		print "Coordinates obtained: ", args[0]['lat'], args[0]['lng']
		s.sendall(str(args[0]['lat']) + "," + str(args[0]['lng']))

	def on_disconnect(*args):
		s.close()

	def on_request(*args):
		print "Requesting location:"
		s.sendall("request")
		data = s.recv(1024)
		print "Location received:", data
		socketIO.emit("location", data)



	socketIO.on('connect', on_connect)
	socketIO.on('send', on_send)
	socketIO.on('disconnect', on_disconnect)
	socketIO.on('request', on_request)
	socketIO.wait()

s.close()