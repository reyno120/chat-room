import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import socketio from "socket.io-client";

const socket = socketio('http://localhost:4000', {
  withCredentials: true
});

function App() {
  const [input, setInput] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    console.log(input);
    socket.emit("chat message", input);
    setInput('');
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <h1>Welcome to the chat room</h1>
      <form onSubmit={onSubmit}>
        <TextField value={input} onChange={handleChange}></TextField>
        <Button type="submit" variant="contained" style={{display: 'block', margin: 'auto', marginTop: '2em'}}>Submit</Button>
      </form>
    </div>
  );
}

export default App;
