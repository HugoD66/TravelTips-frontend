import React, {useEffect, useState} from "react";
import {ItineraryModel} from "../../../models/ItineraryModel";
import Datetime from "react-datetime";
import moment from "moment/moment";
import {getCategoryList} from "../../../services/categoryService";
import {CategoryModel} from "../../../models/CategoryModel";
import {updateItinerary} from "../../../services/itineraryService";
import {DayItineraryModel} from "../../../models/DayItineraryModel";
import {
  createDayItinerary,
  deleteDayInItinerary,
  getDayInItineraryByItineraryId
} from "../../../services/dayItineraryService";
import {Link} from "react-router-dom";
import Map from "../../Map";
import {TipModel} from "../../../models/TipModel";
import {CityModel} from "../../../models/CityModel";
import {getCityList} from "../../../services/cityService";
import {getTipList} from "../../../services/tipService";
import Calendar from "react-calendar";
import AgendaUpdateTips from "../../AgendaUpdateTips";
import {toast} from "react-toastify";

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

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [citiesList, setCitiesList] = useState<CityModel[]>([]);
  const [tipList, setTipsList] = useState<TipModel[]>([]);
  const [tipSelected, setTipSelected] = useState<TipModel | null>(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [agendaVisible, setAgendaVisible] = useState(false);

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
    fetchCityList();
    fetchTipsList();
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
  const fetchCityList = async () => {
    try {
      if (token) {
        const cityList = await getCityList();
        setCitiesList(cityList);
        console.log(cityList);
      }
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  }
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
  const fetchTipsList = async () => {
    try {
      if (token) {
        const tipsList = await getTipList();
        setTipsList(tipsList);
        console.log(tipsList)
      }
    } catch (error) {
      console.error("Error fetching tips", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryID = categories.find(categ => categ.name === selectedCategory)?.id;

    const updatedItinerary = {
      name,
      dayOne: dateDebut?.toISOString(),
      lastDay: dateFin?.toISOString(),
      public: isPublic,
      idCategory: categoryID,
      numberDay: dateDebut && dateFin ? moment(dateFin).diff(moment(dateDebut), 'days') : 0,
    };
    if (!selectedItinerary?.id || !updatedItinerary || !token) {
      throw Error('Missing data');
    }
    await updateItinerary(selectedItinerary?.id, updatedItinerary, token);

    toast.success(`Itinéraire modifié`, {
      position: "top-center",
      autoClose: 3000,
      className: "toast",
    });
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCities(prevCities => {
      const isAlreadySelected = prevCities.includes(cityId);
      if (isAlreadySelected) {
        return prevCities.filter(id => id !== cityId);
      } else {
        return [...prevCities, cityId];
      }
    });
  };

  const removeDayItinerary = async (dayId: string) => {
    await deleteDayInItinerary(dayId, token!);
    fetchDayItinerary();
  }

  const handleDateClick = () => {
    setAgendaVisible(true);
  }
  const addNewTips = async (tip: TipModel) => {
    setTipSelected(tip)
  }

  function handleAddTip(tip: TipModel, slot: string, date: Date) {
    console.warn(tip, slot, date)
    const updatedDayItinerary = [...dayItinerary];
    const newDayItinerary: DayItineraryModel = {
      slot: slot,
      date: date,
      idTips: tip,
      idItinerary: selectedItinerary?.id,
      };
    updatedDayItinerary.push(newDayItinerary);
    setDayItinerary(updatedDayItinerary);

    createDayItinerary(newDayItinerary, token!).then(() => {
      toast.success(`Etape ajoutée`, {
        position: "top-center",
        autoClose: 3000,
        className: "toast",
      });
    })


    console.log(updatedDayItinerary);
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
        <h3>Mes itinéraires déjà ajoutés</h3>
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

        <h3>Réorganiser mon itinéraire</h3>
        <div className="content-city-list-update">
          <div className="content-city-update">
            {citiesList.map((city: CityModel) => (
              <div key={city?.id} className="content-city">
                <input
                  type="checkbox"
                  id={city.id}
                  value={city.name}
                  checked={selectedCities.includes(city.id!)}
                  onChange={() => handleCitySelect(city.id!)}
                />
                <label htmlFor={city.id}>{city.name}</label>
              </div>
            ))}
          </div>
          <div className="map-tips-itinerary">
            <h4>Les tips de la ville</h4>
            {selectedCities.length > 0 && tipList.filter(tip =>
              selectedCities.includes(
                typeof tip.idCity === 'object' ? tip.idCity.id! : tip.idCity
              )
            ).map((tip: TipModel) => (
              <div key={tip.id} className="content-map-container">
                <div className="tip-selection-update-itinerary">
                  <div className="tip-desc">
                    <h4>{tip.name}</h4>
                    <p>Adresse: {tip.address}</p>
                    <p>Ville: {typeof tip.idCity === "object" ? tip.idCity.name : ""}</p>
                    <p>Code postal: {typeof tip.idCity === "object" ? tip.idCity.zipCode : ""}</p>
                    <p>Pays:
                      {tip.idCity &&
                        typeof tip.idCity === "object" &&
                        tip.idCity.idCountry &&
                        typeof tip.idCity.idCountry === "object" &&
                        tip.idCity.idCountry.name}
                    </p>
                    <p>Prix: {tip.price}</p>
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
                <p className="add-button-tip button-add-step" onClick={() => addNewTips(tip)}> Ajouter</p>
                <div className="divider"></div>

              </div>
            ))}
          </div>
        </div>
        {tipSelected && (
          <div>
            <h4 className="tip-selected">{tipSelected.name}</h4>
            <Calendar
              onClickDay={handleDateClick}
              value={selectedDate}
              className="calendar-component"
            />
            {agendaVisible && (
              <AgendaUpdateTips
                date={selectedDate}
                tip={tipSelected}
                onAddTipClick={handleAddTip}
                />
            )}
          </div>
        )}
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default UpdateItinerary;
