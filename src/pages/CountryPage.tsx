import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import Map, { TipLocation } from "../components/Map";
import Modal from "../components/Modal";
import AddTips from "../components/forms/AddTips";
import "../styles/countrypage.css";
import axios from "axios";
import { getCountryByName } from "../services/countryService";
import {getTipList, getTipsByCityId} from "../services/tipService";
import { useTip } from "../context/TipProvider";
import ProgressBar from "../components/ProgressBar";
import { getTipsByCountry } from "../services/tipService";
import { PictureModel } from "../models/PictureModel";
import { Link } from "react-router-dom";
import defaultPicture from "../styles/pictures/defaultTipsPIcture.jpg";
import {TipModel} from "../models/TipModel";
import {getPictures} from "../services/pictureService";

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

interface Tip {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  images: string[];
}

const CountryPage = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tipsLocations, setTipsLocations] = useState<
    { lat: string; lng: string }[]
  >([]);
  const [geoTips, setGeoTips] = useState<TipLocation[]>([]);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  //const [tipDetails, setTipDetails] = useState<TipModel | null>(null);
  const { tipDetail, setTipDetail } = useTip();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tips, setTips] = useState<Tip[]>([]);
  const [pictureList, setPictureList] = useState<PictureModel[]>([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (countryName) {
      fetchCountryDetails(countryName);
      fetchWeather(countryName);
      getTipsByName(countryName);
      fetchTips();
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
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const formattedData = data.map((country: any) => ({
        name: { common: country.name.common },
        capital: country.capital[0],
        region: country.region,
        subregion: country.subregion,
        flags: { svg: country.flags.svg },
        latlng: country.latlng,
        alpha3Code: country.cca3,
        currency: country.currencies ? Object.keys(country.currencies) : [],
        backgroundImageUrl: `https://source.unsplash.com/1600x900/?${country.name.common}`,
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
          return await getTipsByCityId(countryName);
        });
        const citiesWithTips = await Promise.all(tipsList);
        const flatTips = citiesWithTips.flat();

        const tipsLocations = flatTips.map((tip: any) => {
          return { lat: tip.lat, lng: tip.lng, tipSelected: tip };
        });
        setGeoTips(tipsLocations);
      } else {
        console.log("No cities found for the given country name:", countryName);
      }
    } catch (error) {
      console.error("Error fetching tips by country name:", error);
    }
  };

  const fetchTips = async () => {
    if (token && countryName) {
      try {
        const fetchedTips = await getTipsByCountry(countryName, token);
        setTips(fetchedTips);

        if (fetchedTips) {
          const allPicturePromises = fetchedTips.map(async (tip: TipModel) => {
            const pictureResponses = await getPictures(tip.id!);
            return pictureResponses.map((picture: PictureModel) => ({
              ...picture,
              tipId: tip.id,
            }));
          });
          const picturesArrays = await Promise.all(allPicturePromises);
          const allPictures = picturesArrays.flat();
          setPictureList(allPictures);
        }
      } catch (error) {
        console.error("Failed to fetch tips:", error);
      }
    }
  };

  const handleTipSelect = useCallback(
    (tipDetail: any) => {
      setTipDetail(tipDetail);
    },
    [setTipDetail]
  );

  useEffect(() => {
    console.log("Tip detail updated in CountryPage:", tipDetail);
  }, [tipDetail]);

  return (
    <div className="country-page">
      {country ? (
        <>
          <div
            className="country-title"
            style={{
              backgroundImage: `url(${country?.backgroundImageUrl})`,
              backgroundSize: "no-repeat center center/cover",
            }}
          >
            <h1>{country.name.common}</h1>
          </div>
          <h2>Informations</h2>
          <div className="country-details">
            <div className="flag">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
              />
            </div>
            <div className="country-cards">
              <div className="informations">
                <p>Capital: {country.capital}</p>
                <p>Region: {country.region}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Currency: {country.currency.join(", ")}</p>
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
          <h2>Carte</h2>

          <div className="map-details">
            <Map
              onMarkerClick={handleTipSelect}
              isInteractive={false}
              initialPosition={{
                lat: country.latlng[0],
                lng: country.latlng[1],
              }}
              markers={geoTips}
              zoom={2.5}
            />
            {tipDetail.id ? (
              <div className="detail-content">
                <h3>Information sur le tips:</h3>
                <p>Nom: {tipDetail.name}</p>
                <p>Adresse: {tipDetail.address}</p>
                {tipDetail.createdAt ? (
                  <p>
                    Créé le:{" "}
                    {new Date(tipDetail.createdAt).toLocaleDateString()}
                  </p>
                ) : (
                  <p>Date de création inconnue</p>
                )}
                <p>Prix :</p>
                <ProgressBar value={tipDetail.price} max={100} />
                <Link key={tipDetail.id} to={`/tips/${tipDetail.id}`}>
                  <button className="redirect-to-tips">Aller voir ! </button>
                </Link>
              </div>
            ) : (
              <div className="detail-content">
                <p>Cliquez sur un tips pour voir plus de détails.</p>
                {isModalOpen && (
                  <Modal onClose={() => setIsModalOpen(false)}>
                    <AddTips />
                  </Modal>
                )}
                <button onClick={() => setIsModalOpen(true)}>
                  Ajouter un nouveau tips
                </button>
              </div>
            )}
          </div>

          <div className="tips-container">
            <h2>La liste des tips pour le pays: {countryName}</h2>
            <div className="tips-carousel">
              {tips.map((tip) => (
                <Link key={tip.id} to={`/tips/${tip.id}`} className="tip-card">
                  {pictureList.filter(picture => picture.idTips!.id === tip.id).length > 0 ?
                    pictureList.map((picture: PictureModel) =>
                      picture.idTips!.id === tip.id ?
                        <img src={"http://localhost:4000/" + picture.url} className="picture-tips-unit-card"
                             alt="représentation de l'image"/> : null
                    ) :
                    <img src={defaultPicture} alt="Image par défaut"/>
                  }
                  <div className="tip-card-content">
                    <h3 className="tip-card-title">{tip.name}</h3>
                    <p className="tip-card-description">{tip.address}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Pas d'information sur le pays...</p>
      )}
    </div>
  );
};

export default CountryPage;
