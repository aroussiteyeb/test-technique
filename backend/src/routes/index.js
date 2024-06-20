// index.js

const express = require('express');
const router = express.Router();
const partiesRoutes = require('./partiesRoutes');
const chatRoutes = require('./chatRoutes');

router.use('', partiesRoutes);
router.use('', chatRoutes);

module.exports = router;
