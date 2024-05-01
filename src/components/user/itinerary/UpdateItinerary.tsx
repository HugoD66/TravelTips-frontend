import React, { useEffect, useState } from "react";
import { ItineraryModel } from "../../../models/ItineraryModel";
import Datetime from "react-datetime";
import moment from "moment/moment";
import { CountryModel } from "../../../models/CountryModel";
import { getCountryList } from "../../../services/countryService";
import { getCategoryList } from "../../../services/categoryService";
import { CategoryModel } from "../../../models/CategoryModel";
import {updateItinerary} from "../../../services/itineraryService";

interface UpdateItineraryProps {
  selectedItinerary: ItineraryModel | undefined;
}

const UpdateItinerary: React.FC<UpdateItineraryProps> = ({ selectedItinerary }) => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    fetchCategories();

    if (selectedItinerary) {
      setName(selectedItinerary.name || "");
      setDateDebut(selectedItinerary.dayOne ? new Date(selectedItinerary.dayOne) : null);
      setDateFin(selectedItinerary.lastDay ? new Date(selectedItinerary.lastDay) : null);
      setIsPublic(selectedItinerary.public !== undefined ? selectedItinerary.public : false);
      if (selectedItinerary.idCategory && typeof selectedItinerary.idCategory === 'object') {
        setSelectedCategory(selectedItinerary.idCategory.name);
      }
    }
  }, [selectedItinerary]);

  const fetchCategories = async () => {
    try {
      if (token) {
        const categoriesList = await getCategoryList();
        setCategories(categoriesList);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e)

    const updatedItinerary = {
      name,
      dayOne: dateDebut?.toISOString(),
      lastDay: dateFin?.toISOString(),
      public: isPublic,
      idCategory: categories.find((categ) => categ.name === selectedCategory)?.id,
      numberDay: dateDebut && dateFin ? moment(dateFin).diff(moment(dateDebut), 'days') : 0,
    };
    if(!selectedItinerary?.id || !updatedItinerary || !token) {
      throw Error('Missing data');
    }
    await updateItinerary(selectedItinerary?.id, updatedItinerary, token);

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Modifier mon itinéraire</h1>
        <div>
          <label>Nom de l'itinéraire :</label>
          <input
            type="text"
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
          <label>Catégorie :</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((categ) => (
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
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public :
          </label>
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default UpdateItinerary;
