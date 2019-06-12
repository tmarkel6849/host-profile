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

module.exports = {
  pool,
  getLastHostEntry,
  getRandomHost
}


/*************** postgres functions ***************/
// CREATE FUNCTION getlangs(id NUMERIC)
// RETURNS TABLE(language VARCHAR) AS $$
// SELECT languages.language FROM languages
// INNER JOIN hostlangs ON hostlangs.host_id = $1
// WHERE languages.id = hostlangs.lang_id;
// $$ LANGUAGE 'sql';

// CREATE FUNCTION gethost(id NUMERIC)
// RETURNS TABLE(id INTEGER, name VARCHAR, description VARCHAR, interaction VARCHAR, datejoined VARCHAR, responserate VARCHAR, responsetime VARCHAR, hosturl VARCHAR) AS $$
// SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts
// INNER JOIN cohosts ON cohosts.host_id = $1
// WHERE hosts.id = $1 OR hosts.id = cohosts.cohost_id;
// $$ LANGUAGE 'sql';