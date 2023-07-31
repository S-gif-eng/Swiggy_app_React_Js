import React, { useState, useEffect } from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CARDS_IMG_URL, BASE_URL, CORS_PROXY } from "../API";

const Menu = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CORS_PROXY + BASE_URL);
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
  }, [carouselData]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  };

  return (
    <div className="secondoffercontainer">
      <div className="offertop">
        <h2>{title}</h2>
        <div className="arrow">
          <a
            href="#"
            onClick={handlePrev}
            style={{ opacity: currentIndex === 0 ? 0.5 : 1, pointerEvents: currentIndex === 0 ? "none" : "auto" }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
          <a
            href="#"
            onClick={handleNext}
            style={{
              opacity: currentIndex === carouselData.length - 1 ? 0.5 : 1,
              pointerEvents: currentIndex === carouselData.length - 1 ? "none" : "auto",
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>
      <div className="imagenav1">
        <div
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {carouselData.map((restaurant) => {
            const imageUrl = `${CARDS_IMG_URL}${restaurant.info.cloudinaryImageId}`;
            // console.log("Image URL:", imageUrl);
            return (
              <div key={restaurant.info.id} className="carousel-item1">
                <img
                  src={imageUrl}
                  alt={`Image ${restaurant.info.id}`}
                  className="carousel-img1"
                />
               
                <div className="image-text">{restaurant.info.name}</div>
                <div className="ratingimg"><img src="./icons/rating.png" alt="" /> <div className="ratingtext">Rating: {restaurant.info.avgRating}</div></div>
                <div className="menusitems">{restaurant.info.cuisines}</div>
                <div className="locality">{restaurant.info.areaName}</div>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Menu;
