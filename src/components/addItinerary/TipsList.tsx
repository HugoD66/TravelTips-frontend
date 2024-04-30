import React, { useState } from "react";
import { TipModel } from "../../models/TipModel";
import "../../styles/tiplist.css";

interface TipsListComponentProps {
  tips: TipModel[];
  onTipSelect: (tip: TipModel) => void;
  onOrganizeDaysClick: () => void;
}

const TipsListComponent: React.FC<TipsListComponentProps> = ({
  tips,
  onTipSelect,
  onOrganizeDaysClick,
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
        {cities.map((city) => (
          <div key={city}>
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
            <div key={tip.id}>
              <h2>{tip.name}</h2>
              <p>{tip.name}</p>
              <p>{tip.address}</p>
              <p>{typeof tip.idCity === "object" ? tip.idCity.name : ""}</p>
              <p>{typeof tip.idCity === "object" ? tip.idCity.zipCode : ""}</p>
              <p>
                {tip.idCity &&
                  typeof tip.idCity === "object" &&
                  tip.idCity.idCountry &&
                  typeof tip.idCity.idCountry === "object" &&
                  tip.idCity.idCountry.name}
              </p>
              <p>{tip.price}</p>
              <button onClick={() => onTipSelect(tip)}>Ajouter</button>
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
