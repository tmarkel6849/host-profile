const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const languages = require('../db/languages.js');

/*********************** Global Variables ***********************/

const totalLanguages = Object.keys(languages).length

/*********************** FUNCTIONS TO CREATE RANDOM ENTRIES *************************/

const languageIdx = () => {
  return Math.ceil(Math.random() * totalLanguages)
}

const hostSpokenLanguages = () => {
  return Math.ceil(Math.random() * 2)
}

const hostLanguageEntry = (host_id) => {
  let language_id = languageIdx();
  return { host_id, language_id }
}

/************************* WRITE ENTRIES TO CSV *************************/

const entries = []

const csvWriter = createCsvWriter({
  path: 'hostsLang1.csv',
  header: [
    { id: 'host_id', title: 'host_id' },
    { id: 'language_id', title: 'language_id' }
  ]
})

const createCsv = (amount, hostId) => {
  let spokenLanguages;
  for ( let i = 0; i < amount; i++ ) {
    spokenLanguages = hostSpokenLanguages()
    if ( spokenLanguages === 1 ) {
      entries.push(hostLanguageEntry(hostId))
    } else if ( spokenLanguages === 2 ) {
      entries.push(hostLanguageEntry(hostId))
      entries.push(hostLanguageEntry(hostId))
    }
    hostId++
  }
  csvWriter.writeRecords(entries)
    .then(() => {
      console.log('host language csv created...')
    })
}

// createCsv(10, 1);