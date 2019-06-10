const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/***********************FUNCTIONS TO CREATE RANDOM ENTRIES*************************/

const totalLanguages = 8;

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

/**********************WRITE ENTRIES TO CSV*************************/

const csvWriter = createCsvWriter({
  path: 'hostsLang1.csv',
  header: [
    { id: 'host_id', title: 'host_id' },
    { id: 'language_id', title: 'language_id' }
  ]
})

const entries = []

const createCsv = (amount, hostId) => {
  let spokenLanguages;
  for ( let i = 0; i < amount; i++ ) {
    spokenLanguages = hostSpokenLanguages()
    if ( spokenLanguages === 2 ) {
      entries.push(hostLanguageEntry(hostId))
      entries.push(hostLanguageEntry(hostId))
    } else {
      entries.push(hostLanguageEntry(hostId))
    }
    hostId++
  }
  csvWriter.writeRecords(entries)
    .then(() => {
      console.log('file created...')
    })
}

createCsv(10, 1);