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
    // send initial number of users per room to client
    var room1Users = users.filter(user => user.room === 'Americano');
    var room2Users = users.filter(user => user.room === 'Latte');
    var room3Users = users.filter(user => user.room === 'Cappuccino');
    var room4Users = users.filter(user => user.room === 'Cortado');
    var room5Users = users.filter(user => user.room === 'Ristretto');
    socket.emit('initialCount', {
        room1Users: room1Users.length,
        room2Users: room2Users.length,
        room3Users: room3Users.length,
        room4Users: room4Users.length,
        room5Users: room5Users.length
    });

    // join room and broadcast to room
    socket.on('join room', ({ username, room }) => {
        socket.join(room);
        users.push({
            username: username,
            room: room,
            id: socket.id
        });
        var roomUsers = users.filter(user => user.room === room);

        socket.broadcast
            .to(room)
            .emit(
                'message',
                {
                    msg: `${username} has joined the chat!`,
                    user: 'Chat Manager',
                    time: moment().format('h:mm a')
                }
                
            );

    
        io.to(room).emit('roomDetails', roomUsers);

        // emit room counts to homepage
        io.emit('roomCountIncrement', room);
    });

    // listen for messages from client and send them to correct room
    socket.on('chat message', ({ msg, user, room }) => {
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
            users.splice(index, 1)[0];
            var roomUsers = users.filter(user => user.room === thisUser.room);
            io.to(thisUser.room).emit('roomDetails', roomUsers);

            return users;
        }
    });

    socket.on('leaveRoom', () => {
        var index = users.findIndex(user => user.id === socket.id);
        thisUser = users[index];

        if(index !== -1) {
            socket.broadcast
                .to(thisUser.room)
                .emit(
                    'message',
                    {
                        msg: `${thisUser.username} has left the chat.`,
                        user: 'Chat Manager',
                        time: moment().format('h:mm a')
                    }
                    
                );

            users.splice(index, 1)[0];
            var roomUsers = users.filter(user => user.room === thisUser.room);
            io.to(thisUser.room).emit('roomDetails', roomUsers);

            // emit room counts to homepage
            io.emit('roomCountDecrement', thisUser.room);

            return users;
        }
    });
});

server.listen(4000, () => console.log("Running on port 4000"));