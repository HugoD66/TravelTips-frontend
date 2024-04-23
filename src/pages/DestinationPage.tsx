import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/destination.css';
import {getLastestTips} from "../services/tipService";
import Modal from "../components/Modal";
import AddTips from "../components/forms/AddTips";
import {getPictures} from "../services/pictureService";
import {PictureModel} from "../models/PictureModel";
import {TipModel} from "../models/TipModel";
import defaultPicture from "../styles/pictures/defaultTipsPIcture.jpg";

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

interface Tip {
    id: string;
    name: string;
}

interface Itinerary {
    id: string;
    name: string;
}

const DestinationPage = () => {
    const [regions, setRegions] = useState<RegionData[]>([]);
    const [countries, setCountries] = useState<Countries>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [activeSubregion, setActiveSubregion] = useState<string | null>(null);
    const [tips, setTips] = useState<Tip[]>([]);
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pictureList, setPictureList] = useState<PictureModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllCountries();
        fetchTips();
        fetchItineraries();
    }, []);

    const fetchAllCountries = async () => {
        try {
            const { data } = await axios.get('https://restcountries.com/v3.1/all');
            const regionData: Record<string, Set<string>> = {};
            data.forEach((country: { region: string; subregion: string }) => {
                if (country.region && country.subregion) {
                    regionData[country.region] = regionData[country.region] || new Set();
                    regionData[country.region].add(country.subregion);
                }
            });

            const regionsWithSubregions = Object.keys(regionData).map(region => ({
                region,
                subregions: Array.from(regionData[region])
            }));
            setRegions(regionsWithSubregions);

            // Fetch countries for each subregion
            regionsWithSubregions.forEach(region => {
                region.subregions.forEach(fetchCountriesByRegion);
            });
        } catch (error) {
            console.error('Error fetching all countries:', error);
        }
    };

    const fetchCountriesByRegion = async (subregion: string) => {
        try {
            const { data } = await axios.get(`https://restcountries.com/v3.1/subregion/${subregion}`);
            setCountries(prev => ({ ...prev, [subregion]: data }));
        } catch (error) {
            console.error('Error fetching countries:', error);
        }



    };

    const fetchTips = async () => {

      try {
        if (!token) {
          console.log("No token available.");
          return;
        }
        const response = await getLastestTips(token);
          if (response) {
            const allPicturePromises = response.map(async (tip: TipModel) => {
              const pictureResponses = await getPictures(tip.id!);
              return pictureResponses.map((picture: PictureModel) => ({
                ...picture,
                tipId: tip.id
              }));
            });

            const picturesArrays = await Promise.all(allPicturePromises);
            const allPictures = picturesArrays.flat();
            setPictureList(allPictures);
            setTips(response);
          }
        } catch (error) {
            console.error('Error fetching tips:', error);
        }
    };

    const fetchItineraries = async () => {
        try {
            const response = await axios.get('http://localhost:4000/itinerary');
            if (Array.isArray(response.data)) {
                setTips(response.data);
            } else {
                console.error('Expected an array of itineraries, but received:', response.data);
            }
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
    };

    const handleSubregionClick = (subregion: string) => {
      setActiveSubregion(activeSubregion === subregion ? null : subregion);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.toLowerCase();
      setSearchTerm(value);
      if (value) {
          setFilteredCountries(Object.values(countries).flat().filter(country =>
              country.name.common.toLowerCase().includes(value)
          ));
      } else {
          setFilteredCountries([]);
      }
    };

    const clearSearch = () => {
      setSearchTerm('');
      setFilteredCountries([]);
    };

    return (
        <div className="destination-container">
            <div className="title-banner">
                <h1>Et maintenant, on va où?</h1>
                <p>Nous ne voyageons pas pour échapper à la vie, mais pour que la vie ne nous échappe pas. </p>
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
                    <button onClick={clearSearch} className="close-button">&#10005;</button>
                    {filteredCountries.map(country => (
                        <Link key={country.cca3} to={`/country/${country.name.common}`}>
                            <div>{country.name.common}</div>
                        </Link>
                    ))}
                </div>
            )}
            </div>
            <div className="regions-list">
                {regions.map(region => (
                    <div key={region.region} className="region-item">
                      <span>{region.region}</span>
                      {/* // Rendu des sous-régions */}
                      {region.subregions.map(subregion => (
                          <div key={subregion} className={`subregion-item ${activeSubregion === subregion ? 'active' : ''}`}
                              onClick={() => handleSubregionClick(subregion)}>
                              <span>{subregion}</span>
                              <div className="countries-dropdown">
                                  {countries[subregion]?.map((country) => (
                                      <Link key={country.cca3} to={`/country/${country.name.common}`}>
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
                    {filteredCountries.map(country => (
                        <Link key={country.cca3} to={`/country/${country.name.common}`}>
                            <div>{country.name.common}</div>
                        </Link>
                    ))}
                </div>
            )}
          <div className="carousel-container">
            <h2>Derniers Tips</h2>
            <button onClick={() => setIsModalOpen(true)} className="add-tip-button">Ajouter un Tips</button>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        <AddTips />
                    </Modal>
                )}
            <div className="tips-carousel">
              {tips.map(tip => (
                <Link key={tip.id} to={`/tips/${tip.id}`}>
                  <div>{tip.name}</div>
                  {pictureList.filter(picture => picture.idTips!.id === tip.id).length > 0 ?
                    pictureList.map((picture: PictureModel) =>
                      picture.idTips!.id === tip.id ?
                        <img src={"http://localhost:4000/" + picture.url} alt="représentation de l'image"/> : null
                    ) :
                    <img src={defaultPicture} alt="Image par défaut"/>
                  }
                </Link>
              ))}
            </div>
            <h2>Derniers Itinéraires</h2>
            <button onClick={() => navigate('/itinerary')} className="add-itinerary-button">Ajouter un Itinéraire
            </button>
            <div className="itineraries-carousel">
              {itineraries.map(itinerary => (
                <Link key={itinerary.id} to={`/itineraries/${itinerary.id}`}>
                  <div>{itinerary.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
    );
};

export default DestinationPage;
