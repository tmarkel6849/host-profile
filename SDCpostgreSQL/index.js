const { Pool } = require('pg');

const pool = new Pool ({
  user: 'sdc',
  host: 'localhost',
  database: 'hostprofiles',
  password: 'sdc',
  port: 5432,
})


const getAll = () => {
  const queryString = 'SELECT * FROM hosts';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error(err.message);
    }
    console.log(result);
  })
}

getAll();

module.exports.pool = pool;