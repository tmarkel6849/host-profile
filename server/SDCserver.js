require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { getLastHostEntry } = require('../SDCpostgreSQL/index.js')
const { getRandomHost } = require('../SDCpostgreSQL/index.js')
const PORT = process.env.PORT || 3005;

const app = express()

app.use(cors())
app.use(express.static(pat.join(__dirname + '/../public')))
app.use(bodyParser.json());app.use(bodyParser.urlencoded())


/*********************ROUTES ACCESSING POSTGRES ************************/

app.get('/postgres/lastEntry', (req, res) => {
  getLastHostEntry((data) => {
    if (!data) {
      console.log('error retrieving last entry')
      return res.send(400)
    }
    return res.send(data)
  })
})

app.get('/postgres/randomEntry', (req, res) => {
  getRandomHost((data) => {
    if (!data) {
      console.log('error retrieving random entry')
      return res.send(400)
    }
    return res.send(data)
  })
})

/********************ROUTE ACCESSING MONGODB ****************************/


app.listen(port, () => {
  console.log(`listening on port ${PORT}`);});