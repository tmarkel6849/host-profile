const { Pool } = require('pg');

const pool = new Pool ({
  user: 'sdc',
  host: 'localhost',
  database: 'hostprofiles',
  password: 'sdc',
  port: 5432,
})


const getOne = (cb) => {
  const queryString = `SELECT * FROM hosts ORDER BY id DESC LIMIT 1`;
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error(err.message);
    }
    cb(result.rows);
  })
}

module.exports.pool = pool;
module.exports.getOne = getOne;