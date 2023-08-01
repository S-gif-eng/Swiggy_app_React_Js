import React, { useState, useEffect } from "react";
import "./Footer.css";
import { BASE_URL } from "../API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("API Response:", data);

        if (data.data && Array.isArray(data.data.cards) && data.data.cards.length > 1) {
          // Check if the required data structure is present
          const secondCarouselData = data.data.cards[7]?.card?.card?.brands || [];
          setCarouselData(secondCarouselData);
          setTitle(data.data.cards[7]?.card?.card?.title);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
  };

  return (
    <div className="Footer">
      
      <div className="restaurant-list">
      <div className="offertop">
        <h2>{title}</h2>
      </div>
        {carouselData
          .slice(0, showAll ? carouselData.length : 11)
          .map((restaurant, index) => (
            <div key={index} className="Footer-item">
              <a
                href={restaurant.link}
                target="_blank"
                rel="noopener noreferrer"
                className="Footer-name"
              >
                <div>{restaurant.text}</div>
              </a>
            </div>
          ))}
        {!showAll && carouselData.length > 11 && (
          <div key={11} className="Footer-item">
            <div className="show-more-btn" onClick={handleShowMore}>
              Show More  <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Footer;
