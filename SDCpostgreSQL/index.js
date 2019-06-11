require('dotenv').config()
const { Pool } = require('pg')

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
  const queryString = `SELECT * FROM hosts ORDER BY id DESC LIMIT 1`;
  pool.query(queryString, (err, result) => {
    if ( err ) {
      console.error(err.message)
      return cb()
    }
    return cb(result.rows)
  })
}

const getRandomHost = (cb) => {
  const randomHostId = [ Math.ceil(Math.random() * process.env.HOST_TOTAL) ],
        queryString = 'SELECT * FROM hosts WHERE id=$1'
  pool.query(queryString, randomHostId, (err, result) => {
    if ( err ) {
      console.error(err.message)
      return cb()
    }
    return cb(result.rows)
  })
}

// +++++++++++++++++SELECT LANGUAGES +++++++++++++++++++
// SELECT languages.language FROM languages
// INNER JOIN hostlangs ON hostlangs.host_id = 5
// WHERE languages.id = hostlangs.lang_id;

// +++++++++++++++++SELECT COHOSTS++++++++++++++++++++
// SELECT DISTINCT hosts.name FROM hosts
// INNER JOIN cohosts ON cohosts.host_id = 5
// WHERE hosts.id = 5 OR hosts.id = cohosts.cohost_id;


/******************* EXPORTS *******************/

module.exports.pool = pool
module.exports.getLastHostEntry = getLastHostEntry
module.exports.getRandomHost = getRandomHost