import socketio
import time, datetime

HOST = "http://localhost"
PORT = 3030
NAMESPACE = "/pi"

sio = socketio.Client()

def timestampPrint(message):
    print('[{}] {} '.format(datetime.datetime.now(), message))

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

def sendPing():
    while(True):
        time.sleep(10)
        timestampPrint('Pinging server...')
        sio.emit('ping', namespace=NAMESPACE)

sio.connect("{}:{}".format(HOST, PORT), namespaces=[NAMESPACE])
sendPing()
# sio.connect("http://localhost:3030", namespaces=['/pi'])