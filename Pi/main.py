import socketio
from vision import visionAnalysis
import time, datetime

HOST = "http://localhost"
PORT = 3030
NAMESPACE = "/pi"

sio = socketio.Client()

def timestampPrint(message):
    print('[{}] {} '.format(datetime.datetime.now(), message))

def getSnapshot():
    # Stop livestream (if active), take picture, start livestream (if active),
    #  analyse image, get temp and humidity, send results
    # are we taking an image in this function?
    result = visionAnalysis("pathToImage")
    return result

@sio.on('connect')
def on_connect():
    # print('[{}] Connected '.format(datetime.datetime.utcnow()))
    timestampPrint('Connected to server')

@sio.on('welcome', namespace=NAMESPACE)
def on_welcome(data):
    # print('Welcome: {}'.format(data))
    timestampPrint('Welcome from server: {}'.format(data))
    return 200 

@sio.on('ping', namespace=NAMESPACE)
def on_ping(data):
    # print('[{}] Ping received '.format(datetime.datetime.utcnow()))
    timestampPrint('Ping Received')
    sio.emit('pong', '{}'.format(datetime.datetime.now()), namespace=NAMESPACE)

@sio.on('pong', namespace=NAMESPACE)
def on_pong(data):
    timestampPrint('Pong Received')

@sio.on('disconnect', namespace=NAMESPACE)
def on_disconnect(data):
    # print('[{}] Disconnected '.format(datetime.datetime.utcnow()))
    timestampPrint('Disconnected')
    return datetime.datetime.now()

@sio.on('start_incubation', namespace=NAMESPACE)
def on_start_incubation(data):
    timestampPrint('Starting incubation')
    # Turn on heating element and fan
    return 200

@sio.on('stop_incubation', namespace=NAMESPACE)
def on_stop_incubation(data):
    timestampPrint('Stopping incubation')
    # Turn off heating element and fan
    return 200

@sio.on('start_livestream', namespace=NAMESPACE)
def on_start_livestream(data):
    timestampPrint('Starting livestream')
    # Turn on LEDs and livestream
    return 200

@sio.on('stop_livestream', namespace=NAMESPACE)
def on_stop_livestream(data):
    timestampPrint('Stopping livestream')
    # Turn off LEDs and livestream
    return 200

@sio.on('take_snapshot', namespace=NAMESPACE)
def on_take_snapshot(data):
    timestampPrint('Taking snapshot')
    snapshot = getSnapshot()
    sio.emit('new_snapshot', snapshot, namespace=NAMESPACE)

def sendPing():
    while(True):
        time.sleep(10)
        timestampPrint('Pinging server...')
        sio.emit('ping', namespace=NAMESPACE)

sio.connect("{}:{}".format(HOST, PORT), namespaces=[NAMESPACE])
sendPing()
# sio.connect("http://localhost:3030", namespaces=['/pi'])