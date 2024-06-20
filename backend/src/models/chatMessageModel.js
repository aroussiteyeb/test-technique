// chatMessageModel.js

// This file may not be necessary if using an in-memory approach
// If using a database, it would interact with the chat messages table

let chatMessages = []; // In-memory storage for chat messages

function getChatMessages() {
  return chatMessages;
}

function addChatMessage(nickname, message) {
  const chatMessage = { nickname, message };
  chatMessages.push(chatMessage);
}

module.exports = {
  getChatMessages,
  addChatMessage,
};
