import React from "react";
import "./Offers.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons

const Offers = () => {
    return ( 
        <div className="offercontainer">
            <div className="offertop">
                <h2>Best offers for you</h2>
                <div className="arrow">
                    <a href="#"><FontAwesomeIcon icon={faArrowLeft} /></a> 
                    <a href="#"><FontAwesomeIcon icon={faArrowRight} /></a> 
                </div>
            </div>
            <div className="imagenav">
                {/* Add your content here */}
            </div>
        </div>
    );
}
 
export default Offers; 
