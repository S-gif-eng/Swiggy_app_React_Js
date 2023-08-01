import React, { useState, useEffect } from "react";
import "./Footer1.css";
import { BASE_URL } from "../API";
import Footer2 from "./Footer2";

const Footer1 = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("API Response:", data);

        if (data.data && Array.isArray(data.data.cards) && data.data.cards.length > 1) {
          // Check if the required data structure is present
          const secondCarouselData = data.data.cards[8]?.card?.card?.cuisines|| [];
          setCarouselData(secondCarouselData);
          setTitle(data.data.cards[8]?.card?.card?.title);
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

  return (
    <div className="RestaurantsFood1">
      <div className="offertop">
        <h2>{title}</h2>
      </div>
      <div className="restaurant-list">
        {carouselData.map((restaurant, index) => (
          <div key={index} className="Footer-item ">
          <a href={restaurant.link} target="_blank" rel="noopener noreferrer" className="Footer-name">
            <div >{restaurant.text}</div>
          </a>
        </div>
        ))}
      </div>
    </div>
    
  );
};

export default Footer1;
