require('dotenv').config();
const connectionString = process.env.CONNECTION_STRING;
const pgp = require('pg-promise')();
const db = pgp(connectionString);

const { Pool } = require('pg');

///const PG_URI = '';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
