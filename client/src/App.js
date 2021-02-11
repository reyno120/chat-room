import './App.css';
import React, { useState } from 'react';
import socketio from "socket.io-client";
import Homepage from './components/Homepage.jsx';
import Chatroom from './components/Chatroom.jsx';

const socket = socketio('http://localhost:4000', {
  withCredentials: true
});

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  // const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [homepageTransition, setHomepageTransition] = useState('');
  const [chatroomTransition, setChatroomTransition] = useState('');


  function onSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function handleJoinRoom(room) {
    setRoom(room);
    socket.emit('join room', {username, room});

    setHomepageTransition('slideLeftOut');
    setChatroomTransition('slideLeftIn');
  }

  function handleLeaveRoom() {
    setHomepageTransition('slideRightIn');
    setChatroomTransition('slideRightOut');
    // socket.disconnect();
    socket.emit('leaveRoom');

    var messages = document.getElementsByClassName('new-message-container');
    setTimeout(function() { 
      while(messages[0]) {
        messages[0].parentNode.removeChild(messages[0]);
      } 
    }, 1000);


    // socket.connect();
  }

  // socket.on('roomDetails', roomUsers => {
  //   setUsers(roomUsers);
  // });

  // socket.on('chat message', msg => {
  //   var messages = messages;
  //   messages.push(msg);
  //   setMessages(messages);
  // });

  return (
    <div className="App">
      <Homepage socket={socket} transition={homepageTransition} handleChange={handleChange} onSubmit={onSubmit} handleClick={handleJoinRoom} username={username} room={room} />
      <Chatroom socket={socket} transition={chatroomTransition} room={room} username={username} handleClick={handleLeaveRoom} />
    </div>
  );
}

export default App;
