const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const port = 3000
const apiPrefix = '/api'
const apiVersion = '/v1.0'

app.get('/', (req, res) => res.send('Hello World!'))

// Accepts post request with JSON body containing data of a single snapshot (
//  state of a dish and its environment at a specific point in time)
app.post(apiPrefix + apiVersion + '/snapshot', jsonParser, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);
  
  console.log(req.body);
  return res.sendStatus(200);
});

app.listen(port, () => console.log(`EcoPi API listening on port ${port}!`))