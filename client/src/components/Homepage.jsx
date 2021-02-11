import '../css/homepage.css';
import coffeePhoto1 from '../images/coffee-1.png';
import coffeePhoto2 from '../images/coffee-2.png';
import coffeePhoto3 from '../images/coffee-3.png';
import userIcon from '../images/user-icon.png';
import arrowIcon from '../images/right-arrow-icon.png';
import { useEffect, useState } from 'react';

function Homepage(props) {
    const [room1, setRoom1] = useState(0);
    const [room2, setRoom2] = useState(0);
    const [room3, setRoom3] = useState(0);
    const [room4, setRoom4] = useState(0);
    const [room5, setRoom5] = useState(0);

    var socket = props.socket;

    useEffect(() => {
        socket.on('initialCount', ({room1Users, room2Users, room3Users, room4Users, room5Users}) => {
            setRoom1(room1Users);
            setRoom2(room2Users);
            setRoom3(room3Users);
            setRoom4(room4Users);
            setRoom5(room5Users);
        });


        socket.on('roomCountIncrement', room => {
            switch(room) {
                case 'Americano':
                    setRoom1(prevRoom => prevRoom + 1);
                    break;

                case 'Latte':
                    setRoom2(prevRoom => prevRoom + 1);
                    break;

                case 'Cappuccino':
                    setRoom3(prevRoom => prevRoom + 1);
                    break;

                case 'Cortado':
                    setRoom4(prevRoom => prevRoom + 1);
                    break;

                case 'Ristretto':
                    setRoom5(prevRoom => prevRoom + 1);
                    break;

                default:
                    break;
            }
        });

        socket.on('roomCountDecrement', room => {
            switch(room) {
                case 'Americano':
                    setRoom1(prevRoom => prevRoom - 1);
                    break;

                case 'Latte':
                    setRoom2(prevRoom => prevRoom - 1);
                    break;

                case 'Cappuccino':
                    setRoom3(prevRoom => prevRoom - 1);
                    break;

                case 'Cortado':
                    setRoom4(prevRoom => prevRoom - 1);
                    break;

                case 'Ristretto':
                    setRoom5(prevRoom => prevRoom - 1);
                    break;

                default:
                    break;
            }
        });
    }, [socket]);

    return (
        <div className={`homepage ${props.transition}`}>
            <div className="space"></div>

            <form onSubmit={props.onSubmit} autoComplete="off">
                <label for="username" id="username-label">Username:</label>
                <input id="username" name="username" type="text" value={props.username} onChange={props.handleChange} maxLength="14" required></input>
            </form>

            <div className="rooms">

            <div className={props.username === '' ? "americano-room room disable-room" : "americano-room room"} onClick={() => {props.handleClick('Americano')}}>
                <img className="coffee-icon" src={coffeePhoto1} alt="Coffee cup"></img>
                <p>Chatroom Americano</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>{room1}</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className={props.username === '' ? "latte-room room disable-room" : "latte-room room"} onClick={() => {props.handleClick('Latte')}}>
                <img className="coffee-icon" src={coffeePhoto2} alt="Coffee cup"></img>
                <p>Chatroom Latte</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>{room2}</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className={props.username === '' ? "cappuccino-room room disable-room" : "cappuccino-room room"} onClick={() => {props.handleClick('Cappuccino')}}>
                <img className="coffee-icon" src={coffeePhoto3} alt="Coffee cup"></img>
                <p>Chatroom Cappuccino</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>{room3}</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className={props.username === '' ? "cortado-room room disable-room" : "cortado-room room"} onClick={() => {props.handleClick('Cortado')}}>
                <img className="coffee-icon" src={coffeePhoto1} alt="Coffee cup"></img>
                <p>Chatroom Cortado</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>{room4}</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className={props.username === '' ? "ristretto-room room disable-room" : "ristretto-room room"} onClick={() => {props.handleClick('Ristretto')}}>
                <img className="coffee-icon" src={coffeePhoto2} alt="Coffee cup"></img>
                <p>Chatroom Ristretto</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>{room5}</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            </div>
        </div>
    );
}

export default Homepage;