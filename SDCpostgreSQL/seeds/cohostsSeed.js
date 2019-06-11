const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { hostTotal } = require('./hostSeed.js')
const { lastCohost } = require('./hostSeed.js')

/*********************** GLOBAL VARIABLES ************************/

const maxCohosts = 2

/*********************** FUNCTIONS TO CREATE ENTRIES *************************/

const numberOfCohosts = () => {
  return Math.ceil(Math.random() * maxCohosts)
}

const coHostIdx = (host_id) => {
  let randomIdx = Math.ceil(Math.random() * hostTotal)
  while( true ) {
    if ( randomIdx !== host_id ) return randomIdx
    randomIdx = Math.ceil(Math.random() * hostTotal)
  }
}

const cohostEntry = (host_id) => {
  let cohost_id = coHostIdx(host_id);
  return { host_id, cohost_id }
}

/*********************** WRITE ENTRIES TO CSV *************************/

const csvWriter = createCsvWriter({
  path: '../csv/cohost1.csv',
  header: [
    { id: 'host_id', title: 'host_id' },
    { id: 'cohost_id', title: 'cohost_id' }
  ]
})

const createCsv = (amount) => {
  let currentHost = lastCohost,
      entries = [],
      numOfCohosts
  for ( let i = 0; i < amount; i++ ) {
    numOfCohosts = numberOfCohosts()
    if ( numOfCohosts === 1 ) {
      entries.push(cohostEntry(currentHost))
    } else if ( numOfCohosts === 2 ) {
      entries.push(cohostEntry(currentHost))
      entries.push(cohostEntry(currentHost))
    }
    currentHost++
  }
  csvWriter.writeRecords(entries)
    .then(() => {
      console.log('cohost csv written...')
  })
}

createCsv(10)