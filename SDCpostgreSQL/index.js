require('dotenv').config()
const { Pool } = require('pg')


/******************* DATABASE CONNECTION ********************/

const pool = new Pool ({
  user: 'sdc',
  host: 'localhost',
  database: 'hostprofiles',
  password: 'sdc',
  port: 5432,
})

/******************* Queries **********************/
// rename and replace for getting LAST one
const getLastHostEntry = (cb) => {
  const queryString = `SELECT * FROM hosts ORDER BY id DESC LIMIT 1`;
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error(err.message)
      return cb()
    }
    return cb(result.rows)
  })
}

const getRandomHost = (cb) => {
  const randomHostId = [ Math.ceil(Math.random() * hostTotal) ]
  const queryString = 'SELECT * FROM hosts WHERE id=$1'
  poolquery(queryString, randomHostId, (err, result) => {
    if (err) {
      console.error(err.message)
      return cb()
    }
    return cb(result.rows)
  })
}

module.exports.pool = pool
module.exports.getLastHostEntry = getLastHostEntry
module.exports.getRandomHost = getRandomHost