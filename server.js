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

var users = [];

io.on('connection', (socket) => {
    // join room and broadcast to room
    socket.on('join room', ({ username, room }) => {
        socket.join(room);
        var roomUsers = users.filter(user => room === room);
        users.push({username: room});

        socket.broadcast
            .to(room)
            .emit(
                'message',
                `${username} has joined the room!`
            );

    
        io.to(room).emit('roomDetails', roomUsers);
    });

    // listen for messages from client and send them to correct room
    socket.on('chat message', ({ msg, user, room }) => {
        io.to(room).emit('message', msg);
    });
});

server.listen(4000, () => console.log("Running on port 4000"));