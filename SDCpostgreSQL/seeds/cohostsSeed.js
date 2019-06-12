const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { pool } = require('../index.js')
let { lastSeededHost } = require('./seeder.js')
let { lastSeededJoin } = require('./seeder.js')


/*********************** GLOBAL VARIABLES ************************/

const maxCohosts = 2

/*********************** FUNCTIONS TO CREATE ENTRIES *************************/

const numberOfCohosts = () => {
  return Math.floor(Math.random() * (maxCohosts+1))
}

const coHostIdx = (host_id, firstCohost) => {
  let randomIdx = Math.ceil(Math.random() * lastSeededHost)
  while( true ) {
    if ( randomIdx === host_id ) {
      randomIdx = Math.ceil(Math.random() * lastSeededHost)
    } else if ( randomIdx === firstCohost ) {
      randomIdx = Math.ceil(Math.random() * lastSeededHost)
    } else {
      break
    }
  }
  return randomIdx
}

const cohostEntry = (host_id, firstCohost) => {
  let cohost_id = coHostIdx(host_id, firstCohost);
  return { host_id, cohost_id }
}

/*********************** WRITE ENTRIES TO CSV *************************/

const csvWriter = createCsvWriter({
  path: '../csv/cohosts.csv',
  header: [
    { id: 'host_id', title: 'host_id' },
    { id: 'cohost_id', title: 'cohost_id' }
  ]
})

const createCsvAndSeed = (transaction) => {
  let entries = [],
      firstCohost,
      numOfCohosts
      console.log('entering csv loop')
  for ( let i = 0; i < transaction; i++ ) {
    numOfCohosts = numberOfCohosts()
    if ( numOfCohosts === 0 ) {
      entries.push({ host_id: lastSeededJoin, cohost_id: 0 })
    } else if ( numOfCohosts === 1 ) {
      entries.push(cohostEntry(lastSeededJoin))
    } else if ( numOfCohosts === 2 ) {
      firstCohost = cohostEntry(lastSeededJoin)
      entries.push(firstCohost)
      entries.push(cohostEntry(lastSeededJoin, firstCohost.cohost_id))
    }
    lastSeededJoin++
  }
  console.log('going to write csv....')
  csvWriter.writeRecords(entries)
  .then(() => {
    console.log('cohosts csv written...')
    seedCohosts()
  })
}

const seedCohosts = () => {
  const queryString = "COPY cohosts(host_id, cohost_id) FROM '/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/SDCpostgreSQL/csv/cohosts.csv' DELIMITER ',' CSV HEADER"
  pool.query(queryString, (err, result) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('cohosts table seeded...')
  })
}

module.exports.cohostsSeed = createCsvAndSeed