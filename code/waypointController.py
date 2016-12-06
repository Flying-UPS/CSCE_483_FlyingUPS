import socket
import time
import clr
import MissionPlanner

clr.AddReference("MissionPlanner.Utilities")
print "Starting Mission"
Script.ChangeMode("Guided")
print "Guided Mode"


HOST = ''
PORT = 50001
print 'Starting server on localhost:50001'
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(1)

conn, addr = s.accept()
print('connected by', addr)
while True:
	data = conn.recv(1024)
	if not data: break

	if data == 'request':
		lat = cs.lat
		lng = cs.lng
		print "Location requested. Sending coordinates.", lat, lng
		conn.sendall(str(lat) + "," + str(lng))
	else:
		print "Coordinates obtained: ", data
		print "Setting waypoint"
		item = MissionPlanner.Utilities.Locationwp()
		lat = data.split(",")[0]
		lng = data.split(",")[1]
		alt = 10.00
		MissionPlanner.Utilities.Locationwp.lat.SetValue(item, float(lat))
		MissionPlanner.Utilities.Locationwp.lng.SetValue(item, float(lng))
		MissionPlanner.Utilities.Locationwp.alt.SetValue(item, alt)
		print "WP set"
		MAV.setGuidedModeWP(item)
		print "Going to WP"
		



conn.close