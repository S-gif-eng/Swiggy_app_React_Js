import React, { useEffect, useState } from 'react';

const GetLocation = () => {

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" }
  });
  const onSuccess = (location )=> {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coordinates.latitude,
        lng: location.coordinates.longitude
      },
    });
  };
  const onError=(error)=>
  {
    setLocation({
      loaded: true,
      error
    });
  }

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError(
        {
          code: 0,
          message: "geolocation not supported"

        }
      )
     
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)

  }, [])



  if (!location.loaded) {
    return <div>Loading...</div>;
  }

  if (location.error) {
    return <div>Error: {location.error.message}</div>;
  }

  return (
    <div>
      <h2>Location Details:</h2>
      <p>Latitude: {location.coordinates.lat}</p>
      <p>Longitude: {location.coordinates.lng}</p>
    </div>
  );
}

export default GetLocation;