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
            console.log(msg);
            const div = document.createElement('div');
            this.props.user === msg.user ? div.classList.add('user-message') :
                                           div.classList.add('group-message');
            const timeP = document.createElement('p');
            timeP.innerText = msg.time;
            div.appendChild(timeP);

            var message = document.createElement('p');
            message.innerText = msg.msg;
            div.appendChild(message);
            var element = document.getElementsByClassName("chatroom-messages")[0];
            element.appendChild(div)


            // var newMessage = document.createElement("p");
            // var content = document.createTextNode(msg.msg);
            // newMessage.appendChild(content);
            // var element = document.getElementsByClassName("chatroom-messages")[0];
            // element.appendChild(newMessage);
        });

        this.props.socket.on('roomDetails', roomUsers => {
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
                        <p>user1</p>
                        <p>user2</p>
                        <p>user3</p>
                    </div>

                    <div>
                        <div className="chatroom-messages">
                        </div>

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



// function Chatroom(props) {
//     const [users, setUsers] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [currentMessage, setCurrentMessage] = useState([]);

//     var socket = props.socket;

//     socket.on('roomDetails', roomUsers => {
//         setUsers(roomUsers);
//     });

//     console.log("rererendering");

//     useEffect(() => {
//         socket.on('message', msg => {
//             console.log("rendered");
//             // var msgs = messages;
//             // msgs.push(msg);
//             // setMessages(msgs);
//             // setMessages([...messages, msg]);
//             var newMessage = document.createElement("p");
//             var content = document.createTextNode(msg);
//             newMessage.appendChild(content);
//             var element = document.getElementsByClassName("chatroom-messages")[0];
//             element.appendChild(newMessage);
//         });
//     });
    

//     function handleChange(e) {
//         setCurrentMessage(e.target.value);
//     }

//     function handleSubmit(e) {
//         e.preventDefault();

//         if(currentMessage !== '') {
//             socket.emit('chat message', {
//                 msg: currentMessage, 
//                 user: props.user, 
//                 room: props.room
//             });
//         }
//         setCurrentMessage('');
//     }

//     return (
//         <div className={`chatroom ${props.transition}`}>
//             <div className="chatroom-header">
//                 <img id="chat-icon" src={chatIcon} alt="chat icon" />
//                 <p>Chatroom {props.room}</p>
//                 <div className="leave-room-button-container">
//                     <button onClick={props.handleClick}>Leave Room</button>
//                 </div>
//             </div>

//             <div className="chatroom-body">
//                 <div className="chatroom-users">
//                     <h1>{props.username}</h1>
//                     <p>user1</p>
//                     <p>user2</p>
//                     <p>user3</p>
//                 </div>

//                 <div>
//                     <div className="chatroom-messages">
//                         {messages.map(msg => 
//                         <p>
//                             {msg}
//                         </p>
//                         )}
//                     </div>

//                     <div className="chatroom-input">
//                         <form onSubmit={handleSubmit}>
//                             <input value={currentMessage} onChange={handleChange} placeholder="Type something..." />
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chatroom;