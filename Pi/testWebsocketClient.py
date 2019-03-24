import socketio
import time, datetime
import json

HOST = "http://localhost"
PORT = 3030
NAMESPACE = "/dashboard"

sio = socketio.Client()

def timestampPrint(message):
    print('[{}] {} '.format(datetime.datetime.now(), message))

@sio.on('connect')
def on_connect():
    timestampPrint('Connected to server')

@sio.on('welcome', namespace=NAMESPACE)
def on_welcome(data):
    timestampPrint('Welcome from server: {}'.format(data))
    return 200 

@sio.on('ping', namespace=NAMESPACE)
def on_ping(data):
    timestampPrint('Ping Received')
    sio.emit('pong', '{}'.format(datetime.datetime.now()), namespace=NAMESPACE)

@sio.on('pong', namespace=NAMESPACE)
def on_pong(data):
    timestampPrint('Pong Received')

@sio.on('disconnect', namespace=NAMESPACE)
def on_disconnect(data):
    timestampPrint('Disconnected')
    return datetime.datetime.now()

@sio.on('new_snapshot', namespace=NAMESPACE)
def on_new_snapshot(data):
    j_content = json.loads(data)
    timestampPrint('New snapshot received from {}'.format(j_content['timestamp']))

@sio.on('new_temp_humidity_reading', namespace=NAMESPACE)
def on_new_temp_humidity_reading(data):
    timestampPrint('New temperature and humidity readings received')
    timestampPrint('    Temperature: {}'.format(data['temperature']))
    timestampPrint('    Humidity: {}'.format(data['humidity']))

def sendPing():
    while(True):
        time.sleep(10)
        timestampPrint('Pinging server...')
        sio.emit('ping', namespace=NAMESPACE)

sio.connect("{}:{}".format(HOST, PORT), namespaces=[NAMESPACE])
# sendPing()

time.sleep(5)
interval = { "interval": 10000 }
sio.emit('start_incubation', interval, namespace=NAMESPACE)