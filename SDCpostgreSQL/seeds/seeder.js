/******************** SEEDING FUNCTION IMPORTS *********************/

const { hostSeed } = require('./hostSeed.js')
const { cohostsSeed } = require('./cohostsSeed.js')
const { langSeed } = require('./langSeed.js')
const { hostslangSeed } = require('./hostsLangSeed.js')

/******************** GLOBAL VARIABLES **********************/

let lastSeededHost = 10,
    lastSeededJoin = 0

/******************** FULL SPECTRUM SEEDING FUNCTION +++++++++++++++*/

const masterSeeder = (transaction, transactions) => {
  // langSeed()
  for ( let i = 0; i < transactions; i++ ) {
    hostSeed(transaction)
    lastSeededHost += transaction
    cohostsSeed(transaction)
    hostslangSeed(transaction)
    lastSeededJoin += transaction
  }
}

// masterSeeder(10, 10);

module.exports.lastSeededHost = lastSeededHost
module.exports.lastSeededJoin = lastSeededJoin