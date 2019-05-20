const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/host/:id', (req, res) => {
  let data = {};
  db.from('hosts')
  .select()
  .where('id', req.params.id)
  .then((hostData) => {
    data = JSON.parse(JSON.stringify(hostData[0]));
    console.log(hostData, '=====', data);
  })
  .catch((err) => {
    res.status(500).json({ err });
  });

  db.from('languages')
  .innerJoin('hosts_languages', 'languages.id', '=', 'hosts_languages.language_id')
  .select('language')
  .where('host_id', req.params.id)
  .then((languagesArray) => {
    let langStringsArray = [];
    languagesArray.map((langObj) => {
      langStringsArray.push(langObj.language);
    });
    data.languages = langStringsArray;
    res.status(200).json(data);
  });
});

app.listen(port, () => {console.log(`Listening on port ${port}`)});