require('dotenv').config()
const { Pool } = require('pg')
const { hostTotal } = require('./seeds/hostSeed.js')

/******************* DATABASE CONNECTION ********************/

const pool = new Pool ({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: 'hostprofiles',
  password: process.env.PSQL_PASSWORD,
  port: 5432,
})

/******************* Queries **********************/
//gethost, getlangs psql functions

const getLastHostEntry = (cb) => {
  const hostsQueryString = `SELECT * FROM gethost($1)`,
        langQueryString = `SELECT * FROM getlangs($1)`
  let hostId = [hostTotal],
      data

  pool.query(hostsQueryString, hostId, (err, result1) => {
    if ( err ) {
      return console.error(err.message)
    }
    pool.query(langQueryString, hostId, (err, result2) => {
      if ( err ) {
        return console.error(err.message)
      }
      data = [result1.rows, result2.rows]
      console.log('results are in.... ', data)
      cb(data)
    })
  })
}

const getRandomHost = (cb) => {
  const randomHostId = [ Math.ceil(Math.random() * hostTotal) ],
        hostsQueryString = `SELECT * FROM gethost($1);`,
        langQueryString = `SELECT * FROM getlangs($1);`
  let data;

  pool.query(hostsQueryString, randomHostId, (err, result1) => {
    if ( err ) {
      console.error(err.message)
    }
    pool.query(langQueryString, randomHostId, (err, result2) => {
      if ( err ) {
        return console.error(err.message)
      }
      data = [result1.rows, result2.rows]
      return cb(data)
    })
  })
}

/******************* EXPORTS *******************/

module.exports.pool = pool
module.exports.getLastHostEntry = getLastHostEntry
module.exports.getRandomHost = getRandomHost