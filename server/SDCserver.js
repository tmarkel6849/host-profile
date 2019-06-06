require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
port = 3005;

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.get('/', (req, res) => {
  res.send(200);
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
