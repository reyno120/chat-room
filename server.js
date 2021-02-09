const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const moment = require('moment');

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
        // console.log("joining room: " + room);
        socket.join(room);
        users.push({
            username: username,
            room: room,
            id: socket.id
        });
        var roomUsers = users.filter(user => user.room === room);
        // console.log(roomUsers);

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
        // console.log(msg + ", emitting");
        io.to(room).emit('message', {
            msg: msg,
            user: user,
            time: moment().format('h:mm a')
        });
    });

    socket.on('disconnect', () => {
        var index = users.findIndex(user => user.id === socket.id);
        thisUser = users[index];

        if(index !== -1) {
            console.log(users);
            users.splice(index, 1)[0];
            console.log(users);
            var roomUsers = users.filter(user => user.room === thisUser.room);
            io.to(thisUser.room).emit('roomDetails', roomUsers);
            return users;

        }
    });
});

server.listen(4000, () => console.log("Running on port 4000"));