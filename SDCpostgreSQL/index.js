const { Pool } = require('pg');

const pool = new Pool ({
  user: 'sdc',
  host: 'localhost',
  database: 'hostProfile',
  password: 'sdc',
  port: 5432,
})