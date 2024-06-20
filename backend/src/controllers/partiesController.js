// partiesController.js

const partyService = require('../services/partyService');

async function getAllParties(req, res) {
  try {
    const parties = await partyService.getAllParties();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createParty(req, res) {
  try {
    const { name } = req.body;
    await partyService.createParty(name);
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteParty(req, res) {
  try {
    const { id } = req.params;
    await partyService.deleteParty(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateParty(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await partyService.updateParty(id, status);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllParties,
  createParty,
  deleteParty,
  updateParty,
};
