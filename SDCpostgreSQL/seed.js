const { pool } = require('./index.js');
const faker = require('faker');
const hostData = require('../db/hosts.js');



const begin = () => {
  pool.query('BEGIN;', (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Step one complete, begin phase 2!')
    insert(250000);
  })
}



const insert = (amount) => {
  const queryString = `INSERT INTO hosts (name, description, interaction, cohosts, datajoined, responserate, responsetime, hosturl)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`
  let params;
  for (let i = 0; i < amount; i++) {
    params = [
      faker.name.findName(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.name.findName(),
      'sometime in 2012',
      '99%',
      'usually in a few hours',
      'host.url'
    ]
    pool.query(queryString, params, (err, result) => {
      if (err) {
        return console.error(err.message);
      }
    })
  }
  console.log('step 2 complete, READY THE LASER!')
  commit();
}

const commit = () => {
  pool.query('COMMIT;', (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('step 3 complete, profit!');
  })
}

begin();
