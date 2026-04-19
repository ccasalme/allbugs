require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const res = await client.query('SELECT current_database(), current_user');
    console.log(res.rows[0]);
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
  }
}

main();