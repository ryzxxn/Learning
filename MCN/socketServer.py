# server.py
import socket

# create a socket object
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# get local machine name
host = socket.gethostname()

port = 9999

# bind to the port
s.bind((host, port))

# queue up to 5 requests
s.listen(5)

while True:
   # establish a connection
   clientsocket, addr = s.accept()

   print("Got a connection from %s" % str(addr))

   msg = 'Thank you for connecting'+ "\r\n"
   clientsocket.send(msg.encode('ascii'))
   clientsocket.close()