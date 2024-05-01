import React, { useState } from "react";
import { TipModel } from "../../models/TipModel";
import "../../styles/tiplist.css";
import Map from "../Map";
import ProgressBar from "../ProgressBar";

interface TipsListComponentProps {
  tips: TipModel[];
  onTipSelect: (tip: TipModel) => void;
  onOrganizeDaysClick: () => void;
  isTipSelected: (tip: TipModel) => boolean;
  onTipDeselect: (tip: TipModel) => void;
}

const TipsListComponent: React.FC<TipsListComponentProps> = ({
  tips,
  onTipSelect,
  onOrganizeDaysClick,
  isTipSelected,
  onTipDeselect,
}) => {
  const cities = Array.from(
    new Set(
      tips.map((tip) => (typeof tip.idCity === "object" ? tip.idCity.name : ""))
    )
  );

  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleCitySelect = (city: string) => {
    setSelectedCities((prevSelectedCities) =>
      prevSelectedCities.includes(city)
        ? prevSelectedCities.filter((c) => c !== city)
        : [...prevSelectedCities, city]
    );
  };

  return (
    <div>
      <div className="containerList">
        <h3>Choisir une ou plusieurs villes :</h3>
        <div className="content-city-list">
          {cities.map((city) => (
            <div key={city} className="content-city">
              <input
                type="checkbox"
                id={city}
                value={city}
                checked={selectedCities.includes(city)}
                onChange={() => handleCitySelect(city)}
              />
              <label htmlFor={city}>{city}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="containerList">
        {tips
          .filter(
            (tip) =>
              selectedCities.length === 0 ||
              selectedCities.includes(
                typeof tip.idCity === "object" ? tip.idCity.name : ""
              )
          )
          .map((tip) => (
            <div key={tip.id} className="content-map-container">
              <div className="tip-selection-create-itinerary">
                <div className="tip-desc">
                  <h2>{tip.name}</h2>
                  <p>Adresse: {tip.address}</p>
                  <p>Ville: {typeof tip.idCity === "object" ? tip.idCity.name : ""}</p>
                  <p>Code postal: {typeof tip.idCity === "object" ? tip.idCity.zipCode : ""}</p>
                  <p> Pays:
                     {tip.idCity &&
                      typeof tip.idCity === "object" &&
                      tip.idCity.idCountry &&
                      typeof tip.idCity.idCountry === "object" &&
                      tip.idCity.idCountry.name}
                  </p>
                  <p>
                    Prix :
                    <ProgressBar value={tip.price} max={100} />
                  </p>
                </div>
                <Map
                  isOnItinaryPanel={true}
                  isInteractive={false}
                  initialPosition={{lat: parseFloat(tip.lat), lng: parseFloat(tip.lng)}}
                  markers={[{
                    lat: tip.lat,
                    lng: tip.lng,
                    tipSelected: tip
                  }]}
                />
                </div>
              {isTipSelected(tip) ? (
                <>
                  <div>
                    <button onClick={() => onTipDeselect(tip)}>
                      Supprimer de la liste
                    </button>
                    <button disabled>
                      {isTipSelected(tip) ? "Sélectionné" : "Ajouter"}
                    </button>
                  </div>
                </>
              ) : (
                <button onClick={() => onTipSelect(tip)}>Ajouter</button>
              )}
            </div>
          ))}
      </div>
      <div>
        <button onClick={onOrganizeDaysClick}>Organiser mes journées</button>
      </div>
    </div>
  );
};

export default TipsListComponent;
