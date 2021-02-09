import '../css/chatroom.css';
// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import chatIcon from '../images/chat-icon.svg';


class Chatroom extends Component {
    state = { 
        users: [],
        currentMessage: ''
    }

    componentDidMount() {
        this.props.socket.on('message', msg => {
            // console.log(msg);

            /* 
            <div className="user-message" || 'group-message'>
                <p className="message-header">{timeP}</p>
                <p className="message">{message}</p>
             </div> 
             */

            // create message p
            var message = document.createElement('p');
            message.innerText = msg.msg;
            message.classList.add('message');

            // create header p
            const messageHeader = document.createElement('p');
            messageHeader.classList.add("message-header");
            messageHeader.innerHTML = `${msg.user}<span> - ${msg.time}</span>`;

            // create new div and append header and message
            const div = document.createElement('div');
            div.style.width = this.props.username.length > message.innerText.length ? 
                              this.props.username.length * 16 + 'px' : 
                              message.innerText.length * 16 + 'px';     // set message box based off text length
            this.props.username === msg.user ? div.classList.add('user-message') :
                                           div.classList.add('group-message');



            // the following creates a new container with display: flex and appends it to
            // the chatroom-messages so that user messages are pushed right and
            // group messages are push left
            var element = document.getElementsByClassName("chatroom-messages")[0];
            div.appendChild(messageHeader);
            div.appendChild(message);

            var container = document.createElement('div');
            container.classList.add('new-message-container');
            var newDiv = document.createElement('div');

            if(this.props.username === msg.user) {
                container.appendChild(newDiv);
                container.appendChild(div);
            }
            else {
                container.appendChild(div);
                container.appendChild(newDiv);
            }
            // element.appendChild(div);
            element.appendChild(container);



            element.scrollTop = element.scrollHeight;   // always scroll to bottom of messages
        });

        this.props.socket.on('roomDetails', roomUsers => {
            console.log(roomUsers);
            this.setState({users: roomUsers});
        });
    }


    handleChange = (e) => {
        this.setState({currentMessage: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.currentMessage !== '') {
            this.props.socket.emit('chat message', {
                msg: this.state.currentMessage, 
                user: this.props.username, 
                room: this.props.room
            });
        }

        this.setState({currentMessage: ''});
    }


    render() { 
        return (  
            <div className={`chatroom ${this.props.transition}`}>
                <div className="chatroom-header">
                    <img id="chat-icon" src={chatIcon} alt="chat icon" />
                    <p>Chatroom {this.props.room}</p>
                    <div className="leave-room-button-container">
                        <button onClick={this.props.handleClick}>Leave Room</button>
                    </div>
                </div>

                <div className="chatroom-body">
                    <div className="chatroom-users">
                        <h1>{this.props.username}</h1>
                        <div className="chatroom-users-list">
                            {
                                this.state.users.map((user) => 
                                    {if(user.username !== this.props.username) return (
                                        <p>{user.username}</p>
                                    )}
                                )
                            }
                        </div>
                    </div>

                    <div className="chatroom-messages-container">

                        <div className="chatroom-messages"></div>

                        <div className="chatroom-input">
                            <form onSubmit={this.handleSubmit}>
                                <input value={this.state.currentMessage} onChange={this.handleChange} placeholder="Type something..." />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
 
export default Chatroom;