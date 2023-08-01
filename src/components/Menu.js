import React, { useState, useEffect } from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { MENU_URL, BASE_URL, CORS_PROXY } from "../API";

const Menu = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("API Response:", data);

        if (data.data && Array.isArray(data.data.cards) && data.data.cards.length > 1) {
          // Check if the required data structure is present
          const secondCarouselData = data.data.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
          setCarouselData(secondCarouselData);
          setTitle(data.data.cards[2]?.card?.card?.header?.title);
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  };

  return (
    <div className="Menucontainer">
      <div className="Menutop">
        <h2>{title}</h2>
        <div className="Menuarrow">
        <button
          onClick={handlePrev}
          style={{ opacity: currentIndex === 0 ? 0.5 : 1, pointerEvents: currentIndex === 0 ? "none" : "auto" }}
          className="Menuarrowsymbol"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={handleNext}
          style={{
            opacity: currentIndex === carouselData.length - 1 ? 0.5 : 1,
            pointerEvents: currentIndex === carouselData.length - 1 ? "none" : "auto",
          }}
          className="Menuarrowsymbol"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      </div>
      <div className="menunav">
        <div
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {carouselData.map((restaurant) => {
            const imageUrl = `${MENU_URL}${restaurant.info.cloudinaryImageId}`;
            const cuisines = restaurant.info.cuisines.join(", ");
            // console.log("Image URL:", imageUrl);
            return (
              <div key={restaurant.info.id} className="carousel-item1">
                <img
                  src={imageUrl}
                  alt={`Image ${restaurant.info.id}`}
                  className="carousel-img1"
                />
               <div className="menuData">
                <div className="menuimage-text">{restaurant.info.name}</div>
                <div className="ratingimg"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#21973B"></stop><stop offset="1" stop-color="#128540"></stop></linearGradient></defs></svg> <div className="ratingtext">{restaurant.info.avgRating}</div></div>
                <div className="menus">
                <div className="menusitems">{cuisines}</div>
                <div className="locality">{restaurant.info.areaName}</div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
    
  );
};

export default Menu;
