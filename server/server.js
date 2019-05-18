const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/host', (req, res) => {
  db.from('hosts')
  .select('name', "description", "dateJoined", "responseRate", "responseTime", "hostUrl")
  .where('id', 34)
  .then((hostData) => {
    res.status(200).json(hostData);
  })
  .catch((err) => {
    res.status(500).json({ err });
  });
});

app.listen(3004, () => {console.log(`Listening on port ${port}`)});

// Math.ciel(Math.random() * 100)