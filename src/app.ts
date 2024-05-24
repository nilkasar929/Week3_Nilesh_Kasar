import { saveWeather } from './service';
import express from 'express';
import sequelize from './pgConfig';
import bodyParser from 'body-parser';

// Replace these with your actual API keys
const geocodingApiKey = 'EawR1VooP3sT7WkzEVqlrw==a3GUEDZGn5lTSF6E';
const weatherApiKey ='c19db6272cmshb57302bf98667e1p19ac3fjsncf723e114701';

const app = express();
app.use(bodyParser.json());


app.post('/api/saveWeatherMapping', async (req, res) => {
  try {
    const cities = req.body;

    // Validate request body
    // if (!Array.isArray(cities) || cities.some(city => !city.city || !city.country)) {
    //   return res.status(400).json({ error: 'Invalid input format' });
    // }

    // Fetch coordinates for each city and country pair
    const coordinatesPromises = cities.map(async (cityy: { city: string; country: string }) => {
      
        const { city, country } = cityy;
        const { latitude, longitude } = await saveWeather(city, country, geocodingApiKey);
        return { city, country, latitude, longitude };
      } 
    );

    // Wait for all coordinate fetching requests to complete
    const coordinates = await Promise.all(coordinatesPromises);

    // Filter out any null values (invalid coordinates)
    const validCoordinates = coordinates.filter(coord => coord !== null);

    res.status(200).json({ message: 'Coordinates fetched successfully', data: validCoordinates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

