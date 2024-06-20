// websocket.js

const WebSocket = require('ws');

let chatMessages = []; // This could be moved to a service or database in a real application
let wss;

function initWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('a user connected');
    ws.on('close', () => {
      console.log('user disconnected');
    });
  });
}

function broadcastMessage(chatMessage) {
    console.log(chatMessage)
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'chat-message', message: chatMessage }));
      }
    });
  }


module.exports = {
  initWebSocket,
  broadcastMessage,
};
