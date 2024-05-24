"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const saveWeather = async (city, country, geocodingApiKey) => {
    const response = await axios_1.default.get(`https://api.api-ninjas.com/v1/geocoding?city=
    ${city}
    &country=
    ${country}`, {
        params: { city, country },
        headers: { 'X-Api-Key': geocodingApiKey },
    });
    return response.data[0];
};
exports.saveWeather = saveWeather;
