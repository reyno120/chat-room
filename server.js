const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('user has connected');

    socket.on("chat message", (msg) => {
        console.log(msg);
    });
});

server.listen(4000, () => console.log("Running on port 4000"));