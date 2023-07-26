import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLifeRing, faUserLarge, faCartShopping,faPercent } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    return (
        <div className="container">
            <div className="left">
                <img src="./icons/logo.png" alt="logo not found" />
                <input type="text" placeholder="Address" />
            </div>
            <div className="right">
                <a  href="#"> <FontAwesomeIcon icon={faSearch} /> Search</a>
                <a href="#"><FontAwesomeIcon icon={faPercent} /> Offers</a>
                <a href="#"><FontAwesomeIcon icon={faLifeRing} /> Help</a>
                <a href="#"><FontAwesomeIcon icon={faUserLarge} /> Sign In</a>
                <a href="#"><FontAwesomeIcon icon={faCartShopping} /> Cart</a>
            </div>
        </div>
    );
}

export default Navbar;

