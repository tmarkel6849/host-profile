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

/******************* EXPORTS *******************/

module.exports.pool = pool
module.exports.getLastHostEntry = getLastHostEntry
module.exports.getRandomHost = getRandomHost