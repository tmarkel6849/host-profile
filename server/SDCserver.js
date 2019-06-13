require('newrelic')
require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require('path'),
      { getLastHostEntry } = require('../SDCpostgreSQL/index.js'),
      { getRandomHost } = require('../SDCpostgreSQL/index.js'),
      { getHost } = require('../SDCpostgreSQL/index.js')

const port = process.env.PORT || 3005,
      app = express()

app.use(cors())
app.use(express.static(path.join(__dirname + '/../public')))
app.use(bodyParser.json());app.use(bodyParser.urlencoded())


/********************* ROUTES ACCESSING POSTGRES ************************/

app.get('/postgres/lastentry', (req, res) => {
  getLastHostEntry((data) => {
    if ( !data ) {
      console.log('error retrieving last entry')
      return res.send(400)
    }
    return res.send(data)
  })
})

app.get('/postgres/randomentry', (req, res) => {
  getRandomHost((data) => {
    if ( !data ) {
      console.log('error retrieving random entry')
      return res.send(400)
    }
    return res.send(data)
  })
})

app.get('./postgres/host', (req, res) => {
  getHost(req.body, ()=> {
    if ( !data ) {
      console.error('error retrieveing host')
      res.send(400)
    }
    return res.send(data)
  })
})

/******************** HEY! LISTIN!! **********************/

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})