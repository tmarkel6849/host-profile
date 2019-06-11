const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const languages = require('../../db/languages.js');
const { lastSeededHost } = require('./seeder.js')
const { pool } = require('../index.js')

/*********************** Global Variables ***********************/

const totalLanguages = Object.keys(languages).length,
      maxLanguages = 2

/*********************** FUNCTIONS TO CREATE RANDOM ENTRIES *************************/

const languageIdx = () => {
  return Math.ceil(Math.random() * totalLanguages)
}

const hostSpokenLanguages = () => {
  return Math.ceil(Math.random() * maxLanguages)
}

const hostLanguageEntry = (host_id, firstLanguage) => {
  let lang_id = languageIdx()
  if ( firstLanguage !== undefined ) {
    while (firstLanguage === lang_id ) {
      lang_id = languageIdx()
    }
  }
  return { host_id, lang_id }
}

/************************* WRITE ENTRIES TO CSV *************************/

const csvWriter = createCsvWriter({
  path: '../csv/hostLangs.csv',
  header: [
    { id: 'host_id', title: 'host_id' },
    { id: 'lang_id', title: 'lang_id' }
  ]
})

const createCsvAndSeed = (transaction) => {
  let hostId = lastSeededHost,
      entries = [],
      firstLanguage,
      spokenLanguages
  for ( let i = 0; i < transaction; i++ ) {
    spokenLanguages = hostSpokenLanguages()
    if ( spokenLanguages === 1 ) {
      entries.push(hostLanguageEntry(hostId))
    } else if ( spokenLanguages === 2 ) {
      firstLanguage = hostLanguageEntry(hostId)
      entries.push(firstLanguage)
      entries.push(hostLanguageEntry(hostId, firstLanguage.lang_id))
    }
    hostId++
  }
  csvWriter.writeRecords(entries)
  .then(() => {
    console.log('hostLangs csv created...')
    seedHostLangs()
  })
}

const seedHostLangs = () => {
  const queryString = "COPY hostLangs(host_id, lang_id) FROM '/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/SDCpostgreSQL/csv/hostLangs.csv' DELIMITER ',' CSV HEADER"
  pool.query(queryString, (err, result) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('hostLangs table seeded...')
  })
}

// createCsvAndSeed(10);
module.exports.hostslangSeed = createCsvAndSeed