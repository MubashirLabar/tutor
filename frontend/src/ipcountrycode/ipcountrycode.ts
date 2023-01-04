import React from "react";
import axios from 'axios';
const countryCode = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      return ( res.data.country_code );
}
 
export  default countryCode;