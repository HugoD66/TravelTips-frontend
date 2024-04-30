import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { CountryModel } from "../../models/CountryModel";
import moment from "moment";
import "moment/locale/fr";
import { CategoryModel } from "../../models/CategoryModel";

const AddItinerary = ({
  onSubmit,
  listCountry,
  listCategories,
}: {
  onSubmit: (
    name: string,
    country: string,
    dateDebut: string,
    dateFin: string,
    isPublic: boolean,
    category: string
  ) => void;
  listCountry: CountryModel[];
  listCategories: CategoryModel[];
}) => {
  const [country, setCountry] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id = "";

    if (country && dateDebut && dateFin && selectedCategory) {
      const selectedCategoryObject = listCategories.find(
        (categ) => categ.name === selectedCategory
      );
      if (selectedCategoryObject) {
        id = selectedCategoryObject.id;
      }
      onSubmit(
        name,
        country,
        dateDebut.toISOString(),
        dateFin.toISOString(),
        isPublic,
        id
      );
    }
  };

  const handleCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsPublic(e.target.checked);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Créer mon itinéraire</h1>

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Sélectionner un pays</option>
          {listCountry.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <div>
          <label>Nom de l'itinéraire :</label>
          <input
            type="text"
            placeholder="Nom de l'itinéraire"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Date de début :</label>
          <Datetime
            locale="fr"
            dateFormat="DD/MM/YYYY"
            timeFormat={false}
            value={dateDebut || undefined}
            onChange={(date) => setDateDebut(moment(date).toDate())}
          />
        </div>
        <div>
          <label>Date de fin :</label>
          <Datetime
            locale="fr"
            dateFormat="DD/MM/YYYY"
            timeFormat={false}
            value={dateFin || undefined}
            onChange={(date) => setDateFin(moment(date).toDate())}
          />
        </div>
        <div className="category-list">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            {listCategories.map((categ) => (
              <option key={categ.id} value={categ.name}>
                {categ.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={handleCheckboxChange}
            />
            Public :
          </label>
          <span>{isPublic ? " Oui" : " Non"}</span>
        </div>
        <button type="submit">Créer mon itinéraire</button>
      </form>
    </div>
  );
};

export default AddItinerary;
