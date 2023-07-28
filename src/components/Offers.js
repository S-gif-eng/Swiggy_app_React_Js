import React, { useState, useEffect } from "react";
import "./Offers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CARDS_IMG_URL, BASE_URL, CORS_PROXY, TEST_URL } from "../API";

const Offers = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Added currentIndex state to track the current visible image set

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CORS_PROXY + BASE_URL);
        const data = await response.json();

        if (data.data && Array.isArray(data.data.cards)) {
          setCarouselData(data.data.cards);
          console.log("caro" + data.data.cards);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching, whether successful or not
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading UI
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="offercontainer">
      <div className="offertop">
        <h2>Best offers for you</h2>
        <div className="arrow">
          <a href="#" onClick={handlePrev}> {/* Add onClick handlers to left and right arrows */}
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
          <a href="#" onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>
      <div className="imagenav">
        {/* Map carouselData to render carousel items */}
        <div>
          {carouselData[0].card.card.imageGridCards &&
            carouselData[0].card.card.imageGridCards.info &&
            carouselData[0].card.card.imageGridCards.info.map(imageInfo => {
              const imageUrl = `${CARDS_IMG_URL}${imageInfo.imageId}`;
              console.log("Image URL:", imageUrl); // Add this line to check the image URLs
              return (
                <img
                  key={imageInfo.id}
                  src={imageUrl}
                  alt={`Image ${imageInfo.id}`}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Offers;
