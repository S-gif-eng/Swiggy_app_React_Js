import React, { useState, useEffect } from "react";
import "./Footer3.css";
import { CARDS_IMG_URL, BASE_URL } from "../API";

const Footer3 = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [androidAppImage, setAndroidAppImage] = useState(null);
  const [iosAppImage, setIosAppImage] = useState(null);
  const [androidAppLink, setAndroidAppLink] = useState(null);
  const [iosAppLink, setIosAppLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("API Response:", data);

        if (data.data && Array.isArray(data.data.cards) && data.data.cards.length > 1) {
          // Check if the required data structure is present
          const card = data.data.cards[10]?.card?.card;
          const secondCarouselData = card?.brands || [];
          setCarouselData(secondCarouselData);
          setTitle(card?.title);
          setAndroidAppImage(card?.androidAppImage);
          setIosAppImage(card?.iosAppImage);
          setAndroidAppLink(card?.androidAppLink);
          setIosAppLink(card?.iosAppLink);
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
    <div className="Footer3">
      <div className="offertop">
        <h2>{title}</h2>
        <div className="app-images">
          {androidAppLink && (
            <a href={androidAppLink} target="_blank" rel="noopener noreferrer">
              {androidAppImage && <img src={`${CARDS_IMG_URL}${androidAppImage}`} alt="Android App" />}
            </a>
          )}
          {iosAppLink && (
            <a href={iosAppLink} target="_blank" rel="noopener noreferrer">
              {iosAppImage && <img src={`${CARDS_IMG_URL}${iosAppImage}`} alt="iOS App" />}
            </a>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Footer3;
