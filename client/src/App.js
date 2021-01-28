import './App.css';
import React, { useState, useEffect } from 'react';
import socketio from "socket.io-client";
import Homepage from './components/Homepage.jsx';
import Chatroom from './components/Chatroom.jsx';

const socket = socketio('http://localhost:4000', {
  withCredentials: true
});

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [homepageTransition, setHomepageTransition] = useState('');
  const [chatroomTransition, setChatroomTransition] = useState('');

  function onSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function handleClick(room) {
    setRoom(room);
    socket.emit('join room', {username, room});

    setHomepageTransition('slideLeftOut');
    setChatroomTransition('slideLeftIn');
  }

  socket.on('roomDetails', roomUsers => {
    setUsers(roomUsers);
  });

  socket.on('chat message', msg => {
    var messages = messages;
    messages.push(msg);
    setMessages(messages);
  });

  return (
    <div className="App">
      <Homepage transition={homepageTransition} handleChange={handleChange} onSubmit={onSubmit} handleClick={handleClick} username={username} />
      <Chatroom transition={chatroomTransition} room={room} username={username} />
    </div>
  );
}

export default App;
