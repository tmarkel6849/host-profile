const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const languages = require('../db/languages.js');
const hostData = require('../db/hosts.js');
const { hostIdx } = require('../SDCpostgreSQL/seed.js');
const { langIdx } = require('../SDCpostgreSQL/seed.js');

//   name: data.name,
//   descriptions: data.description,
//   interaction: data.interaction,
//   cohosts: JSON.stringify(data.cohosts),
//   datejoined: data.datejoined,
//   responserate: data.responserate,
//   responsetime: data.responsetime,
//   hosturl: data.hosturl,
//   language1: data.language1,
//   language2: data.language2

/**********************CREATE RANDOM HOST ENTRY***********************/

const randomCsvEntry = () => {
  let entry = {
    name: hostData[hostIdx()].name,
    description: hostData[hostIdx()].description,
    interaction: hostData[hostIdx()].interaction,
    cohosts: hostData[hostIdx()].coHosts,
    datejoined: hostData[hostIdx()].dateJoined,
    responserate: hostData[hostIdx()].responseRate,
    responsetime: hostData[hostIdx()].responseTime,
    hosturl: hostData[hostIdx()].hostUrl,
    languages: '',
  }
  return entry;
}


/***********************WRITES TO CSV*******************************/

const csvWriter = createCsvWriter({
  path: 'hostsTest1.csv',
  header: [
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'interaction', title: 'interaction' },
    { id: 'cohosts', title: 'cohosts' },
    { id: 'datejoined', title: 'datajoined' },
    { id: 'responserate', title: 'responserate' },
    { id: 'responsetime', title: 'responsetime' },
    { id: 'hosturl', title: 'hosturl' },
    { id: 'languages', title: 'languages' }
  ]
});

const records = [
  { name: 'Billy', lang: 'spanglish man' },
  { name: 'Joey', lang: 'funky chicken' }
];

csvWriter.writeRecords(records)
  .then(() => {
    console.log('...done')
  });