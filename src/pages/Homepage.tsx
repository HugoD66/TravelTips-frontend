import React, { useState } from 'react';
import GlobeComponent from '../components/GlobeComponent';
import { Country } from '../models/CountryData';
import '../styles/homepage.css';
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <div className="containerHomepage">
      <h1 className="titleHomepage">Bienvenue voyageur</h1>
      <div className="globeAndInfo">
        <div className="globeContainer">
          <GlobeComponent onCountryClick={setSelectedCountry} />
        </div>
        {selectedCountry && (
          <article className="countryCard">
            <figure>
              <img src={selectedCountry.flag} alt={`Drapeau de ${selectedCountry.name}`} />
            </figure>
            <div className="countryCardText">
              <h2>{selectedCountry.name}</h2>
              <p className="countryCardDetail">Capitale: {selectedCountry.capital}</p>
              <p className="countryCardDetail">Région: {selectedCountry.region}</p>
              <p className="countryCardDetail">Sous-région: {selectedCountry.subregion}</p>
              <p className="countryCardDetail">Devise: {selectedCountry.currency}</p>
              <p className="countryCardDetail">Code alpha-3: {selectedCountry.alpha3Code}</p>
              <p className="countryCardDetail">Latitude: {selectedCountry.latlng[0]}</p>
              <p className="countryCardDetail">Longitude: {selectedCountry.latlng[1]}</p>
              <div className="button-container">
                <Link to={`/destinations/${selectedCountry.name.replace(/\s+/g, '-')}`}>Voir la destination</Link>
                <button onClick={() => alert('Ajouter un tip')}>Ajouter un tip</button>
                <button onClick={() => alert('Créer un itinéraire')}>Créer un itinéraire</button>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default HomePage;