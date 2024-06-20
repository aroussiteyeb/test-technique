// partiesRoutes.js

const express = require('express');
const router = express.Router();
const partiesController = require('../controllers/partiesController');

router.get('/parties', partiesController.getAllParties);
router.post('/parties', partiesController.createParty);
router.delete('/parties/:id', partiesController.deleteParty);
router.put('/parties/:id', partiesController.updateParty);

module.exports = router;
