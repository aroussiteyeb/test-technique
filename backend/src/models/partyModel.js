// partyModel.js

const pool = require('../db');

async function getAllParties() {
  const result = await pool.query('SELECT * FROM parties');
  return result.rows;
}

async function createParty(name) {
  await pool.query('INSERT INTO parties (name, status) VALUES ($1, $2)', [name, 'active']);
}

async function deleteParty(id) {
  await pool.query('DELETE FROM parties WHERE id = $1', [id]);
}

async function updateParty(id, status) {
  await pool.query('UPDATE parties SET status = $1 WHERE id = $2', [status, id]);
}

module.exports = {
  getAllParties,
  createParty,
  deleteParty,
  updateParty,
};
