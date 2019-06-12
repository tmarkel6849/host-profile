require('dotenv').config()
const { Pool } = require('pg'),
      { totalHosts } = require('./seeds/seeder.js')

/******************* DATABASE CONNECTION ********************/

const pool = new Pool ({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: 'hostprofiles',
  password: process.env.PSQL_PASSWORD,
  port: 5432,
})

/******************* HELPER FUNCTION TO FORMAT DATA GOING TO SERVER ***********************/

const formatData = (array, host_id) => {
  let data = { cohosts: {}, languages: {} },
      cohosts = 0,
      languages = 0
  for ( let arr of array ) {
    for ( let obj of arr ) {
      if ( !obj.language ) {
        if ( obj.id === host_id ) {
          data.host = obj
        } else {
          data.cohosts[`cohost${++cohosts}`] = {
            name: obj.name,
            datejoined: obj.datejoined,
            hosturl: obj.hosturl
          }
        }
      } else {
        data.languages[`language${++languages}`] = obj.language
      }
    }
  }
  return data
}

/******************* QUERY FUNCTIONS **********************/

const getLastHostEntry = (cb) => {
  const hostsQueryString = `SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;`,
        langQueryString = `SELECT DISTINCT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;`
  let data

  pool.query(hostsQueryString, [ totalHosts ], (err, result1) => {
    if ( err ) {
      return console.error(err.message)
    }
    pool.query(langQueryString, [ totalHosts ], (err, result2) => {
      if ( err ) {
        return console.error(err.message)
      }
      data = [ result1.rows, result2.rows ]
      console.log('and here is the formatted data.... ', formatData(data, totalHosts))
      cb(data)
    })
  })
}

const getRandomHost = (cb) => {
  const hostsQueryString = `SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;`,
        langQueryString = `SELECT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;`,
        randomHostId = Math.ceil(Math.random() * totalHosts)
        console.log('here is the random index: ', randomHostId)
  let data;

  pool.query(hostsQueryString, [ randomHostId ], (err, result1) => {
    if ( err ) {
      console.error(err.message)
    }
    pool.query(langQueryString, [ randomHostId ], (err, result2) => {
      if ( err ) {
        return console.error(err.message)
      }
      data = [ result1.rows, result2.rows ]
      console.log('formatted data here: ', formatData(data, randomHostId))
      return cb(data)
    })
  })
}

getRandomHost(()=>{})

/******************* EXPORTS *******************/

module.exports = {
  pool,
  getLastHostEntry,
  getRandomHost
}