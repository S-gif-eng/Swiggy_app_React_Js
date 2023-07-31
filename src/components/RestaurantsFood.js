import React, { useState, useEffect } from "react";
import "./RestaurantsFood.css";
import { MENU_URL, BASE_URL, CORS_PROXY } from "../API";

const RestaurantsFood = () => {
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
          const secondCarouselData = data.data.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
          setCarouselData(secondCarouselData);
          setTitle(data.data.cards[3]?.card?.card?.title);
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
    <div className="RestaurantsFood">
      <div className="offertop">
        <h2>{title}</h2>
      </div>
      <div className="restaurant-list">
        {carouselData.map((restaurant) => {
          const imageUrl = `${MENU_URL}${restaurant.info.cloudinaryImageId}`;
          return (
            <div key={restaurant.info.id} className="restaurant-item">
              <img src={imageUrl} alt={`Image ${restaurant.info.id}`} className="restaurant-image" />
              <div className="restaurant-name">{restaurant.info.name}</div>
              <div className="restaurant-rating">
                <img src="./icons/rating.png" alt="" />
                <div className="rating-text">Rating: {restaurant.info.avgRating}</div>
              </div>
              <div className="restaurant-cuisines">{restaurant.info.cuisines}</div>
              <div className="restaurant-area">{restaurant.info.areaName}</div>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default RestaurantsFood;
