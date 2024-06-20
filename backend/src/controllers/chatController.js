// chatController.js

const { broadcastMessage } = require("../utils/websocket");

let chatMessages = []; // This could be moved to a service or database in a real application

function getChatMessages(req, res) {
  try {
    res.json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createChatMessage(req, res) {
    const { nickname, message } = req.body;
    const chatMessage = { nickname, message };
    chatMessages.push(chatMessage);
    broadcastMessage({ type: 'chat-message', message: chatMessage });
    res.status(201).json({ success: true });
}

module.exports = {
  getChatMessages,
  createChatMessage,
};
