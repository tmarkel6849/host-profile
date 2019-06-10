const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const hostData = require('../db/hosts.js');

/******************** GLOBAL VARIABLES ********************/

const hostDataEntries = 100

/******************** FUNCTIONS TO CREATE ENTRIES ************************/

const hostTotal = 0;

const hostIdx = () => Math.floor(Math.random() * hostDataEntries);

const hostEntry = () => {
  return {
    name: hostData[hostIdx()].name,
    description: hostData[hostIdx()].description,
    interaction: hostData[hostIdx()].interaction,
    datejoined: hostData[hostIdx()].dateJoined,
    responserate: hostData[hostIdx()].responseRate,
    responsetime: hostData[hostIdx()].responseTime,
    hosturl: hostData[hostIdx()].hostUrl,
  }
}

/************************** WRITE ENTRIES TO CSV ****************************/

const entries = []

const csvWriter = createCsvWriter({
  path: 'hosts1.csv',
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
  for ( let i = 0; i < amount; i++ ) {
    entries.push(hostEntry())
  }
  csvWriter.writeRecords(entries)
    .then(() => {
      console.log('host csv created...')
    })
}

createCsv(10)

module.exports.hostTotal = hostTotal


/**************************** (Old process) Transaction Insertion Process*********************************/
//index for host table = id_index

// let count = 0;

// const begin = (num) => {
//   pool.query('BEGIN;', (err, result) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Step one complete, begin phase 2!')
//     insert(num);
//   })
// }

// const insert = (amount) => {
//   const queryString = `INSERT INTO hosts (name, description, interaction, cohosts, datajoined, responserate, responsetime, hosturl, language1, language2)
//   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
//   let params;
//   for (let i = 0; i < amount; i++) {
//     params = randomEntry();
//     pool.query(queryString, params, (err, result) => {
//       if (err) {
//         return console.error(err.message);
//       }
//     })
//   }
//   console.log('step 2 complete, READY THE LASER!')
//   commit();
// }

// const commit = () => {
//   pool.query('COMMIT;', (err, result) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('step 3 complete, profit!');
//     console.log('this is the current count: ', count);
//     console.log('this is the count + 1: ', ++count);
//     if (count < 5) {
//       begin(100000);
//     }
//   })
// }
// // this table has been seeded with 10m records
// // begin(100000);
// module.exports.hostIdx = hostIdx;
// module.exports.langIdx = langIdx;
// module.exports.randomEntry = randomEntry;