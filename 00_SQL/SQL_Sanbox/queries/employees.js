const pool = require('../db');

async function viewEmployees() {
  const res = await pool.query(`
    SELECT e.id, e.first_name, e.last_name
    FROM employee e
    ORDER BY e.id
  `);

  console.table(res.rows);
}

async function removeEmployee(id) {
  await pool.query('DELETE FROM employee WHERE id = $1', [id]);
  console.log('Employee removed.');
}

module.exports = {
  viewEmployees,
  removeEmployee,
};