const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/*********************** FUNCTIONS TO CREATE ENTRIES *************************/

const maxCohosts = 2

const numberOfCohosts = () => {
  return Math.ceil(Math.random() * maxCohosts)
}

console.log(numberOfCohosts())

const coHostIdx = (host_id) => {
  return Math.ceil(Math.random() * host_id-1)
}

const cohostEntry = (host_id) => {
  let cohost_id = coHostIdx(host_id);
  return { host_id, cohost_id }
}

/*********************** WRITE ENTRIES TO CSV *************************/

const entries = []

const csvWriter = createCsvWriter({
  path: 'cohost1.csv',
  header: [
    { id: 'host_id', title: 'host_id' },
    { id: 'cohost_id', title: 'cohost_id' }
  ]
})

const createCsv = (amount, host_id) => {
  let coHostNumber;
  for ( let i = 0; i < amount; i++ ) {
    coHostNumber = numberOfCohosts();
    if ( coHostNumber === 1 ) {
      entries.push(cohostEntry(host_id));
    } else if ( coHostNumber === 2 ) {
      entries.push(cohostEntry(host_id));
      entries.push(cohostEntry(host_id));
    }
    host_id++
  }
  csvWriter.writeRecords(entries)
    .then(() => {
      console.log('cohost csv written...')
  })
}

// createCsv(10, 1)