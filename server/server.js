const environment = process.env.NODE_ENV || 'development';
const configuration = require('../server/knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/host', (req, res) => {
  db('hosts')
    .where('listing_id', 1)
    .then((hostData) => {
      return {
        name: hostData.name,
        description: hostData.description,
        dateJoined: hostData.dateJoined,
        responseRate: hostData.responseRate,
        responseTime: hostData.responseTime,
        hostUrl: hostData.hostUrl
      };
    });
});

app.listen(3004, () => {console.log(`Listening on port ${port}`)});