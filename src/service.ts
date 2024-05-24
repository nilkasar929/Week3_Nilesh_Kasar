import axios from "axios";
import Weather from "./userModel";


export const saveWeather = async (city: string, country: string, geocodingApiKey: string)=>{
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=
    ${city}
    &country=
    ${country}`
    , {
      headers: { 'X-Api-Key': geocodingApiKey },

    })
    console.log(response.data[0]);
    return response.data[0];
  } catch (error:any) {
    console.log(error)
  }
    
  };

  
