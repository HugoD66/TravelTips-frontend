import React, { useEffect, useState } from 'react';
import GlobeComponent from '../components/GlobeComponent';
import { Country } from '../models/CountryData';
import '../styles/homepage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

type WeatherInfo = {
  temp_c: number;
  condition: { text: string };
};

type ForecastDay = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: { text: string };
  };
};

type Weather = {
  current: WeatherInfo;
  forecast: {
    forecastday: ForecastDay[];
  };
};

const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    if (selectedCountry?.capital) {
      fetchWeather(selectedCountry.capital);
    }
  }, [selectedCountry]);

  const fetchWeather = async (capital: string) => {
    const apiKey = "b09f1e16de6744c1b9195639241604";
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${capital}&days=3`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    }
  };

  return (
    <div className="containerHomepage">
      <h1 className="titleHomepage">Bienvenue voyageur</h1>
      <div className="globeAndInfo">
        <div className="globeContainer">
          <GlobeComponent onCountryClick={setSelectedCountry} />
        </div>
        {selectedCountry && (
          <div className="countryCard">
            <div className="info-country">
              <img src={selectedCountry.flag} alt={`Flag of ${selectedCountry.name}`} className="country-flag" />
              <div className="country-details">
                <h2>{selectedCountry.name}</h2>
                <p>Capitale: {selectedCountry.capital}</p>
                <p>Région: {selectedCountry.region}</p>
                <p>Sous-région: {selectedCountry.subregion}</p>
                <p>Devise: {selectedCountry.currency}</p>
                <p>Code alpha-3: {selectedCountry.alpha3Code}</p>
                <p>Latitude: {selectedCountry.latlng[0]}</p>
                <p>Longitude: {selectedCountry.latlng[1]}</p>
              </div>
            </div>
            <div className="weather-details">
              {weather && (
                <>
                  <h3>Météo actuelle à {selectedCountry.capital}</h3>
                  <p>Température: {weather.current.temp_c} °C</p>
                  <p>Condition: {weather.current.condition.text}</p>
                  {/* <h4>Prévisions:</h4>
                  {weather.forecast.forecastday.map((day, index) => (
                    <div key={index}>
                      <p>{day.date}</p>
                      <p>Max temp: {day.day.maxtemp_c} °C</p>
                      <p>Min temp: {day.day.mintemp_c} °C</p>
                      <p>Condition: {day.day.condition.text}</p>
                    </div>
                  ))} */}
                </>
              )}
              <div className="button-container">
                <Link to={`/country/${selectedCountry.name.replace(/\s+/g, '-')}`}>Voir la destination</Link>
                <button onClick={() => alert('Ajouter un tip')}>Ajouter un tip</button>
                <button onClick={() => alert('Créer un itinéraire')}>Créer un itinéraire</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
