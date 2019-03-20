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

var serviceAccount = require('./securityAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
//const uid=admin.auth().currentUser.uid;

server.listen(port, () => console.log(`EcoPi API listening on port ${port}!`));

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
  var newPostKey = admin.database().ref().child('posts').push().key;
  var updates = {};
  updates['/posts/' + newPostKey] = req.body;
  updates['/user-posts/'  + '/' + newPostKey] = req.body;
  admin.database().ref().update(updates);

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

// Web socket connection
var pi = io.of(pi_ns)
  .on('connection', function (socket) {
    socket.emit('welcome', 'Hello new Pi');
    timestampPrint('New Pi Connection')

    socket.on('disconnect', (reason) => {
      timestampPrint('Pi Disconnected');
    });

    socket.on('ping', pingEventHandler);
  });

var dashboard = io.of(dashboard_ns)
  .on('connection', function (socket) {
    socket.emit('Hello new dashboard');
  });