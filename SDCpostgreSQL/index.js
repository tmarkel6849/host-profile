require('dotenv').config()
const { Pool } = require('pg'),
      { hostTotal } = require('./seeds/hostSeed.js')

/******************* DATABASE CONNECTION ********************/

const pool = new Pool ({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: 'hostprofiles',
  password: process.env.PSQL_PASSWORD,
  port: 5432,
})

/******************* Queries **********************/

const getLastHostEntry = (cb) => {
  const hostsQueryString = `SELECT * FROM gethost($1)`,
        langQueryString = `SELECT * FROM getlangs($1)`,
        hostId = [ hostTotal ]
  let data

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
        hostsQueryString = `SELECT hosts.name FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;`,
        langQueryString = `SELECT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;`
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

getLastHostEntry(()=>{})

/******************* EXPORTS *******************/

module.exports = {
  pool,
  getLastHostEntry,
  getRandomHost
}
