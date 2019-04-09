import socketio
from vision import visionAnalysis
import time, datetime
import base64
import subprocess
import json

HOST = "http://localhost"
PORT = 3030
NAMESPACE = "/pi"
TMP_IMG_PATH = './picture.png'
LIVESTREAM_SERVICE_NAME = 'livestream.service'

sio = socketio.Client()

def timestampPrint(message):
    print('[{}] {} '.format(datetime.datetime.now(), message))

def getTempHumidity():
    # Read temperature and humidity from sensor and return results
    result = {}
    result['timestamp'] = datetime.datetime.now().isoformat()
    result['temperature'] = 37  # replace with actual reading
    result['humidity'] = 80
    return result

def startLivestream():
    subprocess.call(["sudo", "systemctl", "start", LIVESTREAM_SERVICE_NAME])
    timestampPrint('Livestream started')

def stopLivestream():
    subprocess.call(["sudo", "systemctl", "stop", "livestream.service"])
    timestampPrint('Livestream stopped')

def isLivestreamActive():
    status = str(subprocess.check_output(["sudo", "systemctl", "show", "-p", "SubState", "--value", "livestream.service"]))
    return "running" in status

# Stop livestream (if active), take picture, start livestream (if active)
def takeImage(imgPath):
    livestreamActive = isLivestreamActive()
    if livestreamActive():
        stopLivestream()
        
  #  camera=PiCamera()
  #  camera.start_preview()
#    sleep(5)
   # camera.capture(imgPath)
    #camera.stop_preview()

    if livestreamActive:
        startLivestream()
        
#  Analyse image, get temp and humidity, return results
def getSnapshot():
    imgPath = TMP_IMG_PATH
    # takeImage(imgPath)
    result = {}
    result['timestamp'] = datetime.datetime.now().isoformat()
    result['sensors'] = getTempHumidity()
    result['image_analysis'] = visionAnalysis(imgPath)
    with open(imgPath, "rb") as imgFile:
        result['image_base64'] = base64.b64encode(imgFile.read()).decode('utf-8')

    return result

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

@sio.on('start_incubation', namespace=NAMESPACE)
def on_start_incubation(data):
    timestampPrint('Starting incubation')
    # TODO: Turn on heating element and fan
    return 200

@sio.on('stop_incubation', namespace=NAMESPACE)
def on_stop_incubation(data):
    timestampPrint('Stopping incubation')
    # TODO: Turn off heating element and fan
    return 200

@sio.on('start_livestream', namespace=NAMESPACE)
def on_start_livestream(data):
    timestampPrint('Starting livestream')
    # TODO: Turn on LEDs and livestream
    startLivestream()
    return 200

@sio.on('stop_livestream', namespace=NAMESPACE)
def on_stop_livestream(data):
    timestampPrint('Stopping livestream')
    # TODO: Turn off LEDs and livestream
    stopLivestream()
    return 200

@sio.on('take_snapshot', namespace=NAMESPACE)
def on_take_snapshot(data):
    timestampPrint('Taking snapshot')
    snapshot = getSnapshot()
    snapshotStr = json.dumps(snapshot)
    sio.emit('new_snapshot', snapshotStr, namespace=NAMESPACE)

@sio.on('get_temp_humidity', namespace=NAMESPACE)
def on_get_temp_humidity(data):
    timestampPrint('Getting temperature and humidity')
    readings = getTempHumidity()
    timestampPrint('    Temperature: {}'.format(readings['temperature']))
    timestampPrint('    Humidity: {}'.format(readings['humidity']))
    sio.emit('new_temp_humidity_reading', readings, namespace=NAMESPACE)

def sendPing():
    while(True):
        time.sleep(10)
        timestampPrint('Pinging server...')
        sio.emit('ping', namespace=NAMESPACE)

sio.connect("{}:{}".format(HOST, PORT), namespaces=[NAMESPACE])
# sendPing()