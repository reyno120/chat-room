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

  function onSubmit(e) {
    e.preventDefault();
    console.log(username);
    socket.emit("chat message", username);
    // setUsername('');
  }

  function handleChange(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="App">
      <Homepage handleChange={handleChange} onSubmit={onSubmit} username={username} />
      <Chatroom />
    </div>
  );
}

export default App;
