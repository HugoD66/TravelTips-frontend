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
import { getItineraryList } from "../services/itineraryService";
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


  useEffect(() => {
    fetchTips()
  }, []);
  useEffect(() => {
    fetchAllCountries();
    fetchDayItineraries();
    fetchItineraries();

   /* dayItineraryList.forEach((step: DayItineraryModel) => {
      console.log("coucou")

      itineraries.forEach((itinerary: Itinerary) => {
         if(step.idItinerary === itinerary.id) {

           tips.forEach((tip: TipModel) => {
             if(step.idTips === tip.id) {
               console.log("coucou")
               setMarkers((prev: TipLocation[]) => [...prev, {
                 lat: tip.lat,
                 lng: tip.lng,
                 tipSelected: tip,
               }])
               console.log(markers);
             }
           })
         }
       })
    })*/

  }, [tips]);

  useEffect(() => {
    if (itineraries.length > 0 && dayItineraryList.length > 0 && tips.length > 0) {
      processMarkers();
    }
  }, [itineraries, dayItineraryList, tips]);


  const processMarkers = () => {
    const newMarkers: TipLocation[] = [];
    dayItineraryList.forEach((step) => {
      const itinerary = itineraries.find(it => it.id === step.idItinerary);
      if (itinerary) {
        const tip = tips.find(t => t.id === step.idTips);
        if (tip) {
          console.log('coucou')
          newMarkers.push({
            lat: tip.lat,
            lng: tip.lng,
            tipSelected: tip,
          });
        }
      }
    });
    setMarkers(newMarkers);
  };


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

      // Fetch countries for each subregion
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
        //TODO LATEST TIPS
        console.log(response)
        const filteredTips = response.filter((tip: { createdAt: any; }) => tip.createdAt);
        filteredTips.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });

        const lastSixTips = filteredTips.slice(-6);
        setTips(lastSixTips);

      }
    } catch (error) {
      console.error("Error fetching tips:", error);
    }
  };

  const fetchItineraries = async () => {
    try {
      const response = await getItineraryList();
      setItineraries(response)
      console.log(response);

      console.log('coucou')

      const filteredItineraries = response.filter((itinerary: { dayOne: any; }) => itinerary.dayOne);
      filteredItineraries.sort((a: any, b: any) => {
        const dateA = new Date(a.dayOne);
        const dateB = new Date(b.dayOne);
        return dateB.getTime() - dateA.getTime();
      });
      const lastSixItineraries = filteredItineraries.slice(-6);
      setLastestItineraries(lastSixItineraries);



    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };
  const fetchDayItineraries = async () => {
    try {
      const response = await getDayInItineraryList();

      console.log(response)
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
          {tips.map((tip) => (
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
                  ><button className="itineraries-card-button-explore">Explorer</button>
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
                </div>
                <Map
                  isInteractive={false}
                  isOnItinaryPanel={true}
                  initialPosition={{lat: 0, lng: 0}}
                  markers={markers}
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
