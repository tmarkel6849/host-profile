// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://ronniejimmy:rpropri@localhost/airbnb',
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    }
  }
};