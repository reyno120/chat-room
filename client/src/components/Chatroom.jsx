import '../css/chatroom.css';
import chatIcon from '../images/chat-icon.svg';

function Chatroom() {

    return (
        <div className="chatroom">
            <div className="chatroom-header">
                <img id="chat-icon" src={chatIcon} alt="chat icon" />
                <p>Chatroom Latte</p>
                <div className="leave-room-button-container">
                    <button>Leave Room</button>
                </div>
            </div>

            <div className="chatroom-body">
                <div className="chatroom-users">
                    <h1>chatManager314</h1>
                    <p>user1</p>
                    <p>user2</p>
                    <p>user3</p>
                </div>

                <div className="chatroom-messages">

                </div>
            </div>
        </div>
    );
}

export default Chatroom;