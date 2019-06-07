const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'test1.csv',
  header: [
    { id: 'name', title: 'NAME' },
    { id: 'lang', title: 'LANGUAGE' }
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