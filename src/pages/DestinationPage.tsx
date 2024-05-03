import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/destination.css";
import {getLastestTips, getTipList} from "../services/tipService";
import Modal from "../components/Modal";
import AddTips from "../components/forms/AddTips";
import { getPictures } from "../services/pictureService";
import { PictureModel } from "../models/PictureModel";
import { TipModel } from "../models/TipModel";
import defaultPicture from "../styles/pictures/defaultTipsPIcture.jpg";
import {getItineraryList, getLastestItinerary} from "../services/itineraryService";
import Map, {TipLocation} from "../components/Map";
import {getDayInItineraryList} from "../services/dayItineraryService";
import {DayItineraryModel} from "../models/DayItineraryModel";
import tipsList from "../components/addItinerary/TipsList";
import {ItineraryModel} from "../models/ItineraryModel";

interface Country {
  cca3: string;
  name: {
    common: string;
  };
}

interface RegionData {
  region: string;
  subregions: string[];
}

interface Countries {
  [key: string]: Country[];
}

interface Itinerary {
  idCategory: any;
  numberDay: any;
  id: string;
  name: string;
}

const DestinationPage = () => {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [countries, setCountries] = useState<Countries>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [activeSubregion, setActiveSubregion] = useState<string | null>(null);
  const [lastestTips, setLastestTips] = useState<TipModel[]>([]);
  const [lastestItineraries, setLastestItineraries] = useState<ItineraryModel[]>([]);
  const [tips, setTips] = useState<TipModel[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pictureList, setPictureList] = useState<PictureModel[]>([]);
  const navigate = useNavigate();
  const [dayItineraryList, setDayItineraryList] = useState<DayItineraryModel[]>([]);
  const [markers, setMarkers] = useState<TipLocation[]>([]);
  const [itineraryMarkers, setItineraryMarkers] = useState<{ [itineraryId: string]: TipLocation[] }>({});


  useEffect(() => {
    fetchTips()
  }, []);


  useEffect(() => {
    fetchAllCountries();
    fetchLastestItineraries()
  }, [tips]);

  useEffect(() => {
    fetchDayItineraries();
  }, [lastestItineraries, tips]);







  const fetchAllCountries = async () => {
    try {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      const regionData: Record<string, Set<string>> = {};
      data.forEach((country: { region: string; subregion: string }) => {
        if (country.region && country.subregion) {
          regionData[country.region] = regionData[country.region] || new Set();
          regionData[country.region].add(country.subregion);
        }
      });

      const regionsWithSubregions = Object.keys(regionData).map((region) => ({
        region,
        subregions: Array.from(regionData[region]),
      }));
      setRegions(regionsWithSubregions);

      regionsWithSubregions.forEach((region) => {
        region.subregions.forEach(fetchCountriesByRegion);
      });
    } catch (error) {
      console.error("Error fetching all countries:", error);
    }
  };

  const fetchCountriesByRegion = async (subregion: string) => {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/subregion/${subregion}`
      );
      setCountries((prev) => ({ ...prev, [subregion]: data }));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchTips = async () => {
    try {
      const response = await getTipList();
      if (response) {
        const allPicturePromises = response.map(async (tip: TipModel) => {
          const pictureResponses = await getPictures(tip.id!);
          return pictureResponses.map((picture: PictureModel) => ({
            ...picture,
            tipId: tip.id,
          }));
        });
        const picturesArrays = await Promise.all(allPicturePromises);
        const allPictures = picturesArrays.flat();
        setPictureList(allPictures);

        const filteredTips = response.filter((tip: { createdAt: any; }) => tip.createdAt);
        filteredTips.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });

        const lastSixTips = filteredTips.slice(-6).reverse();
        setTips(response);
        setLastestTips(lastSixTips);
      }
    } catch (error) {
      console.error("Error fetching tips:", error);
    }
  };

  const fetchLastestItineraries = async () => {
    try {
      const response = await getLastestItinerary() ;
      setLastestItineraries(response);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };
  const fetchDayItineraries = async () => {
    try {
      const dayItineraryList = await getDayInItineraryList();
      const newMarkers: TipLocation[] = [];
      dayItineraryList.forEach((dayItinerary: DayItineraryModel) => {
        if(typeof dayItinerary.idItinerary === "object") {
          lastestItineraries.map((itinerary: ItineraryModel) => {
            const dayItineraryId = (dayItinerary.idItinerary as ItineraryModel).id;
            if (itinerary.id === dayItineraryId) {
              if(typeof dayItinerary.idTips === "object") {
                const tipsLat = (dayItinerary.idTips as TipModel).lat;
                const tipsLng = (dayItinerary.idTips as TipModel).lng;
                const tip = (dayItinerary.idTips as TipModel);
                  newMarkers.push({
                    lat: tipsLat,
                    lng: tipsLng,
                    tipSelected: tip,
                  });
              }
              setMarkers(newMarkers)}
          })
        }
      })
    }catch (error) {
      console.error("Error fetching day itineraries:", error);
    }
  }

  const handleSubregionClick = (subregion: string) => {
    setActiveSubregion(activeSubregion === subregion ? null : subregion);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (value) {
      setFilteredCountries(
        Object.values(countries)
          .flat()
          .filter((country) =>
            country.name.common.toLowerCase().includes(value)
          )
      );
    } else {
      setFilteredCountries([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredCountries([]);
  };

  const generationFixtures = () => {
    return fetch(`http://localhost:4000/fixtures/mockups`, {
      method: "POST",
    }).then((response) => {
      if (!response.ok) {
        //throw new Error("Réponse réseau non OK");
        return;
      }
      return response.json();
    });
  };

  return (
    <div className="destination-container">
      <div className="title-banner">
        <h1>Et maintenant, on va où?</h1>
        <p>
          Nous ne voyageons pas pour échapper à la vie, mais pour que la vie ne
          nous échappe pas.{" "}
        </p>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Trouver un pays..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        {searchTerm && (
          <button onClick={clearSearch} className="search-clear">
            &#10005;
          </button>
        )}
        {filteredCountries.length > 0 && (
          <div className="autocomplete-results">
            <button onClick={clearSearch} className="close-button">
              &#10005;
            </button>
            {filteredCountries.map((country) => (
              <Link key={country.cca3} to={`/country/${country.name.common}`}>
                <div>{country.name.common}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="regions-list">
        {regions.map((region) => (
          <div key={region.region} className="region-item">
            <span>{region.region}</span>
            {/* // Rendu des sous-régions */}
            {region.subregions.map((subregion) => (
              <div
                key={subregion}
                className={`subregion-item ${
                  activeSubregion === subregion ? "active" : ""
                }`}
                onClick={() => handleSubregionClick(subregion)}
              >
                <span>{subregion}</span>
                <div className="countries-dropdown">
                  {countries[subregion]?.map((country) => (
                    <Link
                      key={country.cca3}
                      to={`/country/${country.name.common}`}
                    >
                      <div>{country.name.common}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {filteredCountries.length > 0 && (
        <div className="search-results">
          {filteredCountries.map((country) => (
            <Link key={country.cca3} to={`/country/${country.name.common}`}>
              <div>{country.name.common}</div>
            </Link>
          ))}
        </div>
      )}
      <div className="carousel-container-destination">
        <h2>Derniers Tips</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="add-tip-button-destination"
        >
          Ajouter un Tips
        </button>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <AddTips/>
          </Modal>
        )}
        <div className="tips-destination">
          {lastestTips.map((tip: TipModel) => (
            <Link
              key={tip.id}
              to={`/tips/${tip.id}`}
              className="card-destination"
            >
              <div className="card-content-destination">
                <h3 className="card-title-destination">{tip.name}</h3>
                <button className="card-button-destination">Voir plus</button>
              </div>
              {pictureList.filter(picture => picture.idTips!.id === tip.id).length > 0 ?
                pictureList.map((picture: PictureModel) =>
                  picture.idTips!.id === tip.id ?
                    <img src={"http://localhost:4000/" + picture.url} className="picture-tips-unit-card"
                         alt="représentation de l'image"/> : null
                ) :
                <img src={defaultPicture} alt="Image par défaut"/>
              }
            </Link>
          ))}
        </div>

        <h2>Derniers Itinéraires</h2>
        <Link to="/itinerary">
          <button
            onClick={() => navigate("/itinerary")}
            className="add-itinerary-button-destination"
          >
            Ajouter un Itinéraire
          </button>
        </Link>
        <div className="itineraries-carousel">
          {lastestItineraries.map((itinerary) => (
              <div className="card-itinerary">
                <div className="itineraries-card-content">
                  <h2 className="itineraries-card-title">{itinerary.name}</h2>
                  <p>Jour de départ {new Date(itinerary.dayOne!).toLocaleDateString()}</p>
                  <Link
                    key={itinerary.id}
                    to={`/itineraries/${itinerary.id}`}
                    className="card"
                  >
                    <button className="itineraries-card-button-explore">Explorer</button>
                  </Link>
                  <div className="itineraries-card-footer">
                    <p>
                      <i>{itinerary.numberDay} jours</i>
                    </p>
                    <p className="category">
                      {typeof itinerary.idCategory === "object"
                        ? itinerary.idCategory.name
                        : ""}
                    </p>
                  </div>
                  <p className="created-at-initerarie">{new Date(itinerary.createdAt!).toLocaleDateString()}</p>
                </div>
                <Map
                  isInteractive={false}
                  isOnItinaryPanel={true}
                  initialPosition={{lat: 8, lng: -55}}
                  markers={markers}
                  zoom={0.0000000001}
                />
              </div>
          ))}
        </div>
      </div>
      <button
        className="fixture-generation"
        onClick={() => generationFixtures()}
      >
        X
      </button>
    </div>
  );
};

export default DestinationPage;
