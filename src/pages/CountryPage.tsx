import { useParams } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import Map from "../components/Map";
import Modal from "../components/Modal";
import AddTips from "../components/forms/AddTips";
import "../styles/countrypage.css";
import axios from 'axios';
import {getCountryByName} from "../services/countryService";
import {getTipsByCityId} from "../services/tipService";

interface Country {
  name: {
    common: string;
  };
  capital: string;
  region: string;
  subregion: string;
  flags: {
    svg: string;
  };
  latlng: number[];
  alpha3Code: string;
  currency: string[];
  backgroundImageUrl: string;
}

interface WeatherInfo {
  temp_c: number;
  condition: {
    text: string;
  };
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
    };
  };
}

interface Weather {
  current: WeatherInfo;
  forecast: {
    forecastday: ForecastDay[];
  };
}

const CountryPage = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tipsLocations, setTipsLocations] = useState<{ lat: string; lng: string }[]>([]);
  const [geoTips, setGeoTips] = useState<{ lat: string; lng: string }[]>([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (countryName) {
      fetchCountryDetails(countryName);
      fetchWeather(countryName);
      getTipsByName(countryName);

    }
  }, [countryName]);

  const fetchWeather = async (capital: string) => {
    const apiKey = "b09f1e16de6744c1b9195639241604";
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${capital}&days=3`;
      const response = await axios.get<Weather>(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    }
  };

  const fetchCountryDetails = async (name: string) => {
    try {
      const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      const formattedData = data.map((country: any) => ({
        name: { common: country.name.common },
        capital: country.capital[0],
        region: country.region,
        subregion: country.subregion,
        flags: { svg: country.flags.svg },
        latlng: country.latlng,
        alpha3Code: country.cca3,
        currency: country.currencies ? Object.keys(country.currencies) : [],
        backgroundImageUrl: `https://source.unsplash.com/1600x900/?${country.name.common}`
      }));
      setCountry(formattedData[0]);
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  const getTipsByName = async (countryName: string) => {
    try {
      const response = await getCountryByName(countryName);

      if (response && response.city) {
        const tipsList = response.city.map(async (city: any) => {

          if(!token) {
            console.error("Token not found")
            return;
          }

          return await getTipsByCityId(countryName, token);

        });
        const citiesWithTips = await Promise.all(tipsList);
        const flatTips = citiesWithTips.flat();

        const tipsLocations = flatTips.map((tip: any) => {
          return { lat: tip.lat, lng: tip.lng };
        });

        setGeoTips(tipsLocations);
      } else {
        console.log("No cities found for the given country name:", countryName);
      }
    } catch (error) {
      console.error("Error fetching tips by country name:", error);
    }
  }

  return (
    <div className="country-page">
      {country ? (
        <>
          <div className="country-title" style={{ backgroundImage: `url(${country?.backgroundImageUrl})`, backgroundSize: 'no-repeat center center/cover' }}>
            <h1>{country.name.common}</h1>
          </div>
            <div className="country-details">
              <h2>Informations</h2>
              <div className="country-cards">
                <div className="informations">
                  <p>Capital: {country.capital}</p>
                  <p>Region: {country.region}</p>
                  <p>Subregion: {country.subregion}</p>
                  <p>Currency: {country.currency.join(', ')}</p>
                </div>
                <div className="flag">
                  <img src={country.flags.svg} alt={`${country.name.common} flag`} />
                </div>
              </div>
            </div>
            <div className="weather-details">
            <h2>Météo</h2>
              {weather && (
                <>
                  <div className="weather-info">
                    <h3>Météo actuelle {country.capital}</h3>
                    <div className="weather-cat">
                      <p>Temperature: {weather.current.temp_c} °C</p>
                      <p>Condition: {weather.current.condition.text}</p>
                    </div>
                  </div>

                  <div className="forecast-info">
                    <h3>Météo à venir</h3>
                    <div className="forecast-cat">
                    {weather.forecast.forecastday.map((day, index) => (
                      <div key={index}>
                        <p>{day.date}</p>
                        <p>Max temp: {day.day.maxtemp_c} °C</p>
                        <p>Min temp: {day.day.mintemp_c} °C</p>
                        <p>Condition: {day.day.condition.text}</p>
                      </div>
                    ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="map-details">
              <h2>Carte</h2>
              <Map
                isInteractive={false}
                initialPosition={{ lat: country.latlng[0], lng: country.latlng[1] }}
                markers={geoTips}
              />
            </div>
            <div className="country-tips">
              <h2>Les bons tips</h2>
              <button onClick={() => setShowModal(true)} style={{ marginTop: '20px' }}>Ajouter un Tips</button>
                {showModal && <Modal onClose={() => setShowModal(false)}><AddTips /></Modal>}
            </div>

        </>
      ) : (
        <p>Loading country information...</p>
      )}
    </div>
  );
};

export default CountryPage;
