
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://rpropri:rpropri@localhost/airbnb',
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    }
  }
};