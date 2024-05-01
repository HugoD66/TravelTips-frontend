import React, {useEffect, useState} from "react";
import {ItineraryModel} from "../../../models/ItineraryModel";
import Datetime from "react-datetime";
import moment from "moment/moment";
import {CountryModel} from "../../../models/CountryModel";
import {getCountryList} from "../../../services/countryService";
import {getCategoryList} from "../../../services/categoryService";
import {CategoryModel} from "../../../models/CategoryModel";
import {updateItinerary} from "../../../services/itineraryService";
import {DayItineraryModel} from "../../../models/DayItineraryModel";
import {deleteDayInItinerary, getDayInItineraryByItineraryId} from "../../../services/dayItineraryService";
import {Link} from "react-router-dom";
import Map, {TipLocation} from "../../Map";
import {TipModel} from "../../../models/TipModel";

interface UpdateItineraryProps {
  selectedItinerary: ItineraryModel | undefined;
}

export interface Picture {
  id: string;
  url: string;
  createdBy?: string;
}

const UpdateItinerary: React.FC<UpdateItineraryProps> = ({selectedItinerary}) => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [dayItinerary, setDayItinerary] = useState<DayItineraryModel[]>([]);
  const [geoTips, setGeoTips] = useState<TipLocation[]>([]);

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
    console.log(selectedItinerary)

    fetchDayItinerary();
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
  const fetchDayItinerary = async () => {
    try {
      if (token && selectedItinerary) {
        const dayItineraryList = await getDayInItineraryByItineraryId(selectedItinerary.id!);
        setDayItinerary(dayItineraryList);
        console.log(dayItineraryList)
      }
    } catch (error) {
      console.error("Error fetching day itinerary", error);
    }
  }

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
    if (!selectedItinerary?.id || !updatedItinerary || !token) {
      throw Error('Missing data');
    }
    await updateItinerary(selectedItinerary?.id, updatedItinerary, token);

  };

  const removeDayItinerary = async (dayId: string) => {
    console.log(dayId)
    //TODO Remove du dayItinerary dans le onSubmit
    await deleteDayInItinerary(dayId, token!);

    fetchDayItinerary();
  }

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
        {dayItinerary.length > 0 ? (
          dayItinerary.map((day: DayItineraryModel) => (
            <>
              <div key={day.id}>
                {day.idTips && typeof day.idTips === "object" ? (
                  <Link to={`/tips/${day.idTips.id}`} className="tip-card tip-card-custom">
                    <div className="tip-card-content tip-card-content-custom">
                      <h3 className="tip-card-title">{day.idTips.name}</h3>
                      <p className="tip-card-description">{day.idTips.address}</p>
                      <h3>{day.date ? moment(day.date).format('DD/MM/YYYY') : 'Pas de date'}</h3>
                      <p>{day.slot}</p>
                    </div>
                    <div className="tip-card-content-map">
                      <Map
                        isOnItinaryPanel={true}
                        isInteractive={false}
                        initialPosition={{lat: parseFloat(day.idTips.lat), lng: parseFloat(day.idTips.lng)}}
                        markers={[{
                          lat: day.idTips.lat,
                          lng: day.idTips.lng,
                          tipSelected: day.idTips
                        }]}
                      />
                    </div>
                  </Link>
                ) : (
                  <p>Aucun tip associé à cette étape.</p>
                )}
                <span className="remove-day-itinerary"
                      onClick={() => removeDayItinerary(day!.id!)}>Retirer l'étape</span>
              </div>
              <div className="divider"></div>
            </>
          ))
        ) : (
          <p>Vous n'avez pas encore d'étape dans votre itinéraire, veuillez en rajouter.</p>
        )}
        <button type="button" className="button-add-step">Ajouter des étapes</button>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default UpdateItinerary;
