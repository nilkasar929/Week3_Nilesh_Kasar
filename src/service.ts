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

    const latitude = response.data[0].latitude
    const longitude = response.data[0].longitude

    const options = {
      method: 'GET',
      url: `https://weatherapi-com.p.rapidapi.com/current.json`,
      params: { q: `${latitude},${longitude}` },
      headers: {
        'X-RapidAPI-Key': 'c19db6272cmshb57302bf98667e1p19ac3fjsncf723e114701',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    const weatherResponse = await axios.request(options);
    const weatherData = weatherResponse.data;

    console.log(weatherData)
    return response.data[0];
  } catch (error:any) {
    console.log(error)
  }
  };