// chatRoutes.js

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chat', chatController.getChatMessages);
router.post('/chat', chatController.createChatMessage);

module.exports = router;
