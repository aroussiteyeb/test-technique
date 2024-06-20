// chatService.js

// If using a database, this would interact with the chat messages model
// For simplicity, we could directly use the model or keep this file empty for in-memory storage

// Example of a service that could be used for handling chat messages in a database

const chatMessageModel = require('../models/chatMessageModel');

function getChatMessages() {
  return chatMessageModel.getChatMessages();
}

function createChatMessage(nickname, message) {
  chatMessageModel.addChatMessage(nickname, message);
}

module.exports = {
  getChatMessages,
  createChatMessage,
};
