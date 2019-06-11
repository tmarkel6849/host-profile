const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const hostData = require('../../db/hosts.js');
const { pool } = require('../index.js')

/******************** GLOBAL VARIABLES ********************/

const hostDataEntries = Object.keys(hostData).length,
      hostTotal = 10,
      lastCohost = 0,
      lastLanghost = 0

/******************** FUNCTIONS TO CREATE ENTRIES ************************/

const hostIdx = () => Math.floor(Math.random() * hostDataEntries);

const hostEntry = () => {
  return {
    name: hostData[hostIdx()].name,
    description: hostData[hostIdx()].description,
    interaction: hostData[hostIdx()].interaction || 'none',
    datejoined: hostData[hostIdx()].dateJoined || 'none',
    responserate: hostData[hostIdx()].responseRate,
    responsetime: hostData[hostIdx()].responseTime,
    hosturl: hostData[hostIdx()].hostUrl,
  }
}

/******************* CREATE CSV / IMPORT TO DATABASE *********************/

const csvWriter = createCsvWriter({
  path: '../csv/hosts.csv',
  header: [
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'interaction', title: 'interaction' },
    { id: 'datejoined', title: 'datejoined' },
    { id: 'responserate', titel: 'resposnerate' },
    { id: 'responsetime', title: 'responsetime' },
    { id: 'hosturl', title: 'hosturl' }
  ]
})

const createCsvAndSeed = (amount) => {
  const entries = []
  for ( let i = 0; i < amount; i++ ) {
    entries.push(hostEntry())
  }
  csvWriter.writeRecords(entries)
    .then(() => {
      console.log('host csv created...')
      seedHosts()
    })
}

const seedHosts = () => {
  const queryString = "COPY hosts(name, description, interaction, datejoined, responserate, responsetime, hosturl) FROM '/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/SDCpostgreSQL/csv/hosts.csv' DELIMITER ',' CSV HEADER"
  pool.query(queryString, (err, result) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('hosts table seeded...')
  })
}

// createCsvAndSeed(15)

/***************** EXPORTS ********************/

module.exports.hostTotal = hostTotal
module.exports.lastCohost = lastCohost
module.exports.lastLanghost = lastLanghost