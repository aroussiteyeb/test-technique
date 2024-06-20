// partyService.js

const partyModel = require('../models/partyModel');

async function getAllParties() {
  return await partyModel.getAllParties();
}

async function createParty(name) {
  await partyModel.createParty(name);
}

async function deleteParty(id) {
  await partyModel.deleteParty(id);
}

async function updateParty(id, status) {
  await partyModel.updateParty(id, status);
}

module.exports = {
  getAllParties,
  createParty,
  deleteParty,
  updateParty,
};
