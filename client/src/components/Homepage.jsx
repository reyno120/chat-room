import '../css/homepage.css';
import coffeePhoto1 from '../images/coffee-1.png';
import coffeePhoto2 from '../images/coffee-2.png';
import coffeePhoto3 from '../images/coffee-3.png';
import userIcon from '../images/user-icon.png';
import arrowIcon from '../images/right-arrow-icon.png';

function Homepage(props) {
    return (
        <div className={`homepage ${props.transition}`}>
            <div className="space"></div>

            <form onSubmit={props.onSubmit} autoComplete="off">
                <label for="username" id="username-label">Username:</label>
                <input id="username" name="username" type="text" value={props.username} onChange={props.handleChange}></input>
            </form>

            <div className="rooms">

            <div className="americano-room room" onClick={() => {props.handleClick('Americano')}}>
                <img className="coffee-icon" src={coffeePhoto1} alt="Coffee cup"></img>
                <p>Chatroom Americano</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>0</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className="latte-room room" onClick={() => {props.handleClick('Latte')}}>
                <img className="coffee-icon" src={coffeePhoto2} alt="Coffee cup"></img>
                <p>Chatroom Latte</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>0</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className="cappuccino-room room" onClick={() => {props.handleClick('Cappuccino')}}>
                <img className="coffee-icon" src={coffeePhoto3} alt="Coffee cup"></img>
                <p>Chatroom Cappuccino</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>0</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className="cortado-room room" onClick={() => {props.handleClick('Cortado')}}>
                <img className="coffee-icon" src={coffeePhoto1} alt="Coffee cup"></img>
                <p>Chatroom Cortado</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>0</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            <div className="ristretto-room room" onClick={() => {props.handleClick('Ristretto')}}>
                <img className="coffee-icon" src={coffeePhoto2} alt="Coffee cup"></img>
                <p>Chatroom Ristretto</p>
                <div className="usercount"><img className="user-icon" src={userIcon} alt="User Icon"></img>0</div>
                <img className="arrow-icon" src={arrowIcon} alt="Right arrow"></img>
            </div>

            </div>
        </div>
    );
}

export default Homepage;