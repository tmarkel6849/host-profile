const express = require('express');
const app = express();
const test = require('../seeder.js');

const port = 3007;

app.use(express.static('public'));

app.get('/', (req, res) => {console.log('getting...')});

app.listen(3007, () => {console.log(`Listening on port ${port}`)});