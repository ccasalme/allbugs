const pool = require('./db');
const { promptMenu, handleAction } = require('./menu');

async function main() {
  try {
    console.log('Connected to PostgreSQL');

    let keepRunning = true;

    while (keepRunning) {
      const action = await promptMenu();
      keepRunning = await handleAction(action);
    }

    console.log('Goodbye!');
  } catch (err) {
    console.error('Application error:', err.message);
  } finally {
    await pool.end();
  }
}

main();