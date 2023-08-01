import React, { useState, useEffect } from "react";
import "./RestaurantsFood.css";
import { MENU_URL, BASE_URL, CORS_PROXY } from "../API";
import Footer from "./Footer";

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
          const cuisines = restaurant.info.cuisines.join(", ");
          return (
            <div key={restaurant.info.id} className="restaurant-item">
              <img src={imageUrl} alt={`Image ${restaurant.info.id}`} className="restaurant-image" />
              <div className="restaurant-name">{restaurant.info.name}</div>
                
                <div className="ratingimg"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#21973B"></stop><stop offset="1" stop-color="#128540"></stop></linearGradient></defs></svg> <div className="ratingtext">{restaurant.info.avgRating}</div></div>
                <div className="resmenus">
              <div className="restaurant-cuisines">{cuisines}</div>
              <div className="restaurant-area">{restaurant.info.areaName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsFood;
