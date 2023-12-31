import React, { useState, useEffect } from "react";
import "./Offers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CARDS_IMG_URL, BASE_URL, CORS_PROXY, TEST_URL } from "../API";

const Offers = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesCount,setImagesCount]=useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch( BASE_URL);
        const data = await response.json();

        if (data.data && Array.isArray(data.data.cards) && data.data.cards.length > 0) {
          // Get only the first array object's images
          const firstCarouselData = data.data.cards[0].card.card.imageGridCards.info;
          setCarouselData(firstCarouselData);
          const uniqueImageIds = [...new Set(firstCarouselData.map((item) => item.imageId))];
          setImagesCount(uniqueImageIds.length)
          
          // console.log("curo ",carouselData);
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesCount);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagesCount - 1 : prevIndex - 1));
  };

  return (
    <div className="offercontainer">
      <div className="offertop">
      <h2>Best offers for you</h2>
        <div className="arrow">
        <button
          onClick={handlePrev}
          style={{ opacity: currentIndex === 0 ? 0.5 : 1, pointerEvents: currentIndex === 0 ? "none" : "auto" }}
          className="arrow_symbol"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={handleNext}
          style={{
            opacity: currentIndex === imagesCount - 3 ? 0.5 : 1,
            pointerEvents: currentIndex === imagesCount - 3 ? "none" : "auto",
          }}
          className="arrow_symbol"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      </div>
      <div className="imagenav">
        <div
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {carouselData.map((imageInfo) => {
            const imageUrl = `${CARDS_IMG_URL}${imageInfo.imageId}`;
            // console.log("Image URL:", imageUrl);

            return (
              <img
                key={imageInfo.id}
                src={imageUrl}
                alt={`Image ${imageInfo.id}`}
                className="carousel-img"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Offers;
