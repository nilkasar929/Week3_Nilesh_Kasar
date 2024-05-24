"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
const express_1 = __importDefault(require("express"));
const pgConfig_1 = __importDefault(require("./pgConfig"));
const body_parser_1 = __importDefault(require("body-parser"));
// Replace these with your actual API keys
const geocodingApiKey = 'EawR1VooP3sT7WkzEVqlrw==a3GUEDZGn5lTSF6E';
const weatherApiKey = 'c19db6272cmshb57302bf98667e1p19ac3fjsncf723e114701';
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post('api/saveWeatherMapping', (req, res) => {
    const city = req.body.city;
    const country = req.body.country;
    console.log(city);
    (0, service_1.saveWeather)(city, country, geocodingApiKey);
});
pgConfig_1.default.sync().then(() => {
    console.log('Database connected and synchronized');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
