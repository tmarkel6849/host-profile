require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { getOne } = require('../SDCpostgreSQL/index.js');
port = 3005;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.get('/postgres', (req, res) => {
  getOne((data) => {
    if (!data) {
      res.send(404);
      return;
    }
    res.send(data[0]);
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
