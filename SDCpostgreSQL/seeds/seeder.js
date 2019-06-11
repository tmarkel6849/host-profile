/******************** SEEDING FUNCTION IMPORTS *********************/

const { hostSeed } = require('./hostSeed.js')
const { cohostsSeed } = require('./cohostsSeed.js')
const { langSeed } = require('./langSeed.js')
const { hostlangsSeed } = require('./hostsLangSeed')

/******************** GLOBAL VARIABLES **********************/

const lastSeededHost = 0

/******************** FULL SPECTRUM SEEDING FUNCTION +++++++++++++++*/

const masterSeeder = (transaction, transactions) => {
  langSeed()
  for ( let i = 0; i < transactions; i++ ) {
    hostSeed(transaction)
    cohostsSeed(transaction)
    hostlangsSeed(transaction)
  }

}

module.exports.lastSeededHost = lastSeededHost