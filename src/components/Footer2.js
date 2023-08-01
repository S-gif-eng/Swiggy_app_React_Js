import React, { useState, useEffect } from "react";
import "./Footer2.css";
import { BASE_URL } from "../API";
import Footer3 from "./Footer3";

const Footer2 = () => {
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
          const secondCarouselData = data.data.cards[9]?.card?.card?.brands|| [];
          setCarouselData(secondCarouselData);
          setTitle(data.data.cards[9]?.card?.card?.title);
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
      <div className="Footer2-list">
        {carouselData.map((restaurant, index) => (
          <div key={index} className="Footer2-item ">
          <a href={restaurant.link} target="_blank" rel="noopener noreferrer" className="Footer2-name">
            <div >{restaurant.text}</div>
          </a>
        </div>
        ))}
      </div>
      <hr />
      
    </div>
  );
};

export default Footer2;
