const express = require('express')
const app = express()
const fs = require('fs')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const port = 3030
const apiPrefix = '/api'
const apiVersion = '/v1.0'

const tmpFileName = 'snapshot.json'

app.get('/', (req, res) => res.send('Hello World!'))

// Accepts post request with JSON body containing data of a single snapshot (
//  state of a dish and its environment at a specific point in time)
app.post(apiPrefix + apiVersion + '/snapshot', jsonParser, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);
  
  console.log(req.body);

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
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data);
    res.end();
  });
});

app.listen(port, () => console.log(`EcoPi API listening on port ${port}!`))