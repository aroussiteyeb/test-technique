// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const { initWebSocket } = require('./utils/websocket');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', routes);

// Initialize WebSocket server
initWebSocket(server);
module.exports = server;  // Export server for index.js to start
