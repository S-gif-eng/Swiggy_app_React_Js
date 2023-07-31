import React,{useEffect, useState} from 'react'
const GetLocation = () => {

    const [location,setLocation]=useState({
        loaded:false,
        coordinates:{lat:"",long:""}
    });
  
    useEffect(()=>
    {
      if(!("geolocation" in navigator))
      {
        setLocation(state=>({
          ...state,
          loaded:true,
         error:{
            code:0,
            message:"geolocation not supported"

         }
        }))
      }

    },[])

    return location;
}
 
export default GetLocation;