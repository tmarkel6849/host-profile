const hostsData = require('../01hosts');
const langData = require('../03languages');
const listingsData = require('../02listings');

exports.seed = function(knex, Promise) {
  return knex('hosts').del()
  .then(() => knex('listings').del())
  .then(() => knex('languages').del())
  .then(() => {
    return Promise.all(langData.map((lang) => {
      return knex('languages').insert(lang);
    }));
  })
  .then(() => {
    return Promise.all(hostsData.map((host) => {
      return knex('hosts').insert(host);
    }));
  })
  .then(() => {
    return Promise.all(listingsData.map((listing, i) => {
      listing.host_id = i + 1;
      return knex('listings').insert(listing);
    }));
  })
  .catch(console.log);
};
