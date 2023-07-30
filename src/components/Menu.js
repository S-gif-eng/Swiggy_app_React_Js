import React, { useState, useEffect } from "react";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CARDS_IMG_URL, BASE_URL, CORS_PROXY, TEST_URL } from "../API";

const Menu = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title,setTitle]=useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CORS_PROXY + BASE_URL);
        const data = await response.json();
        
        setTitle(data.data.cards[1].card.card.header.title);

        if (data.data && Array.isArray(data.data.cards) && data.data.cards.length > 0) {
          // Get only the first array object's images
          const secondCarouselData = data.data.cards[1].card.card.imageGridCards.info;
          setCarouselData(secondCarouselData);
          console.log("menu ",carouselData);
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
            opacity: currentIndex === carouselData.length ? 0.5 : 1,
            pointerEvents: currentIndex === carouselData.length ? "none" : "auto",
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
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
            console.log("Image URL:", imageUrl);
            console.log("texr "+imageInfo.action.text)
            return (
                <div key={imageInfo.id} className="carousel-item">
                  <img
                    src={imageUrl}
                    alt={`Image ${imageInfo.id}`}
                    className="carousel-img"
                  />
                  <div className="image-text">{imageInfo.action.text}</div>
                  console.log("text "+imageInfo.action.text)
                </div>
              );
          } )}
          
        </div>
      </div>
    </div>
  );
};

export default Menu;
