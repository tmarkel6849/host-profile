const { pool } = require('./index.js');
const hostData = require('../db/hosts.js');
const languages = require('../db/languages.js');

/*************************Create random spoken languages for each host*************************/

const langIdx = () => Math.floor(Math.random() * 8);

const hostLanguages = () => {
  let spokenLangs = Math.ceil(Math.random() * 2),
      idx = langIdx(),
      lang1 = idx;
      lang2 = languages[idx+1] ? idx+1 : idx-1;
  if (spokenLangs === 1) {
    return {
      lang1,
      lang2: -1
    }
  } else if (spokenLangs === 2) {
    return {
      lang1,
      lang2
    }
  }
}

/********************Create Random hosts************************/

const hostIdx = () => Math.floor(Math.random() * 100);

const randomCoHost = () => {
  let coHostData = hostData[hostIdx()].coHosts;
  let coHostKeys = Object.keys(coHostData);
  if (coHostKeys.length === 1) {
    return {
      coHost1: coHostData[coHostKeys[0]]
    };
  } else if (coHostKeys.length === 2) {
    return {
      coHost1: coHostData[coHostKeys[0]],
      coHost2: coHostData[coHostKeys[1]]
    }
  }
  return {};
}

const randomEntry = () => {
  let hostLangs = hostLanguages();
  let entry = [
    hostData[hostIdx()].name,
    hostData[hostIdx()].description,
    hostData[hostIdx()].interaction,
    JSON.stringify(randomCoHost()),
    hostData[hostIdx()].dateJoined,
    hostData[hostIdx()].responseRate,
    hostData[hostIdx()].responseTime,
    hostData[hostIdx()].hostUrl,
    hostLangs.lang1,
    hostLangs.lang2
  ];
  return entry;
}

/****************************Transaction Insertion Process*********************************/
//index for host table = id_index

let count = 0;

const begin = (num) => {
  pool.query('BEGIN;', (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Step one complete, begin phase 2!')
    insert(num);
  })
}

const insert = (amount) => {
  const queryString = `INSERT INTO hosts (name, description, interaction, cohosts, datajoined, responserate, responsetime, hosturl, language1, language2)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
  let params;
  for (let i = 0; i < amount; i++) {
    params = randomEntry();
    pool.query(queryString, params, (err, result) => {
      if (err) {
        return console.error(err.message);
      }
    })
  }
  console.log('step 2 complete, READY THE LASER!')
  commit();
}

const commit = () => {
  pool.query('COMMIT;', (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('step 3 complete, profit!');
    console.log('this is the current count: ', count);
    console.log('this is the count + 1: ', ++count);
    if (count < 5) {
      begin(100000);
    }
  })
}
// this table has been seeded with 10m records
// begin(100000);