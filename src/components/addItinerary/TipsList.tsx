import React, { useState } from "react";
import { TipModel } from "../../models/TipModel";

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
  // Liste des villes uniques
  const cities = Array.from(
    new Set(
      tips.map((tip) => (typeof tip.idCity === "object" ? tip.idCity.name : ""))
    )
  );

  // État pour stocker les villes sélectionnées
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  // Fonction de gestion de la sélection d'une ville
  const handleCitySelect = (city: string) => {
    setSelectedCities((prevSelectedCities) =>
      prevSelectedCities.includes(city)
        ? prevSelectedCities.filter((c) => c !== city)
        : [...prevSelectedCities, city]
    );
  };

  return (
    <div>
      {/* Liste des villes pour la sélection */}
      <div>
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

      {/* Liste des tips filtrés par les villes sélectionnées */}
      <div>
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
              <h3>{tip.name}</h3>
              {/* Afficher les autres détails du tip */}
              <button onClick={() => onTipSelect(tip)}>Ajouter</button>
            </div>
          ))}
      </div>

      {/* Bouton pour organiser les journées */}
      <button onClick={onOrganizeDaysClick}>Organiser mes journées</button>
    </div>
  );
};

export default TipsListComponent;
