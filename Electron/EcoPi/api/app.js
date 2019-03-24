const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors');
const moment = require('moment')
const admin = require('firebase-admin');

var server = require('http').Server(app);
var io = require('socket.io')(server);

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const port = 3030
const apiPrefix = '/api'
const apiVersion = '/v1.0'

const tmpFileName = 'snapshot.json'
const clients = { 'pi': null, 'dashboard': null }
const dashboard_ns = "/dashboard"
const pi_ns = "/pi"

const get_temp_humidity_interval = 5000

var serviceAccount = require('./securityAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testproject-34b05.firebaseio.com"
});


// server.listen(port, () => console.log(`EcoPi API listening on port ${port}!`));
server.listen(port, () => timestampPrint(`EcoPi API listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'))

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// Accepts post request with JSON body containing data of a single snapshot (
//  state of a dish and its environment at a specific point in time)
app.post(apiPrefix + apiVersion + '/snapshot', jsonParser, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);

  console.log(req.body);
  
  var db = admin.firestore();
  var docRef=db.collection('snapshots').doc('snapshot');
  var setData=docRef.set(req.body);

  fs.writeFile(tmpFileName, JSON.stringify(req.body), function (err) {
    if (err)
      return res.sendStatus(500);
    console.log('Saved!');
  });

  return res.sendStatus(200);
});

// Returns the last received snapshot
app.get(apiPrefix + apiVersion + '/snapshot', function (req, res) {
  fs.readFile(tmpFileName, function (err, data) {
    res.writeHead(200, {'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'Content-Type'});
    res.write(data);
    res.end();
  });
});

// app.listen(port, () => console.log(`EcoPi API listening on port ${port}!`))

var timestampPrint = function (message) {
  console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + message + ' ')
};

var pingEventHandler = function(data) {
  timestampPrint('Ping received, sending pong')
  pi.emit('pong', moment().format('YYYY-MM-DD HH:mm:ss'))
};

var sendToDashboard = function (event, data) {
  if (clients.dashboard) {
    clients.dashboard.emit(event, data);
    timestampPrint(event + ' sent to dashboard')
    return true;
  }
  else {
    timestampPrint('ERROR: No dashboard connected')
    return false;
  }
}

var sendToPi = function (event, data = null) {
  if (clients.pi) {
    clients.pi.emit(event, data);
    timestampPrint(event + ' sent to Pi')
    return true;
  }
  else {
    timestampPrint('ERROR: No Pi connected')
    return false;
  }
}

// Web socket connection
var pi = io.of(pi_ns)
  .on('connection', function (socket) {
    socket.emit('welcome', 'Hello new Pi');
    timestampPrint('New Pi Connection');
    clients.pi = socket;

    socket.on('disconnect', (reason) => {
      timestampPrint('Pi Disconnected: ' + reason);
    });

    socket.on('ping', pingEventHandler);

    socket.on('pong', (data) => {
      timestampPrint('Pong received')
    });

    socket.on('new_snapshot', (data) => {
      timestampPrint('New snapshot received');

      // Saving to file only used for testing
      let buff = Buffer.from(JSON.parse(data).image_base64, 'base64');
      var filename = 'picture' + moment().format('-YYMMDD-HHmmss') + '.png';
      fs.writeFile(filename, buff, function (err) {
        if (err)
          timestampPrint('Error saving image: ' + err);
        timestampPrint('Image saved: ' + filename);
      });

      sendToDashboard('new_snapshot', data);

      // Save to db

    });

    socket.on('new_temp_humidity_reading', (data) => {
      timestampPrint('New temperature and humidity readings received');
      timestampPrint('    Temperature: ' + data.temperature);
      timestampPrint('    Humidity: ' + data.humidity);

      sendToDashboard('new_temp_humidity_reading', data);
      
      // Save to db

    });
  });

var dashboard = io.of(dashboard_ns)
  .on('connection', function (socket) {
    socket.emit('welcome', 'Hello new dashboard');
    timestampPrint('New dashboard connection');
    clients.dashboard = socket;

    socket.on('start_incubation', (data) => {
      var interval = data.interval;
      timestampPrint('Starting incubation with snapshot interval: ' + interval + 'ms');

      setInterval(function () {
        sendToPi('get_temp_humidity');
      }, get_temp_humidity_interval)
    
      setInterval(function () {
        sendToPi('take_snapshot');
      }, interval)
    });
  });