const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const hostData = require('../../db/hosts.js');

/******************** GLOBAL VARIABLES ********************/

const hostDataEntries = Object.keys(hostData).length,
      hostTotal = 10,
      lastCohost = 0,
      lastLanghost = 0,

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

/************************** WRITE ENTRIES TO CSV ****************************/

const csvWriter = createCsvWriter({
  path: '../csv/hosts1.csv',
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

const createCsv = (amount) => {
  const entries = []
  for ( let i = 0; i < amount; i++ ) {
    entries.push(hostEntry())
  }
  csvWriter.writeRecords(entries)
    .then(() => {
      console.log('host csv created...')
    })
}

createCsv(10)

/***************** EXPORTS ********************/

module.exports.hostTotal = hostTotal
module.exports.lastCohost = lastCohost
module.exports.lastLanghost = lastLanghost