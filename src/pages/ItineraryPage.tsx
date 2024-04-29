import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddItinerary from "../components/forms/AddItinerary";
import TipsListComponent from "../components/addItinerary/TipsList";
import OrganizeItinerary from "../components/addItinerary/OrganizeItinerary";
import { getTipsByCountry } from "../services/tipService";
import { TipModel } from "../models/TipModel";
import { ItineraryModel } from "../models/ItineraryModel";
import { createItinerary } from "../services/itineraryService";
import { CountryModel } from "../models/CountryModel";
import { getCountryList } from "../services/countryService";
import { toast } from "react-toastify";

const ItineraryPage = () => {
  const [isTipsListVisible, setIsTipsListVisible] = useState(false);
  const [isAddItineraryVisible, setIsAddItineraryVisible] = useState(true);
  const [isItineraryVisible, setIsItineraryVisible] = useState(false);
  const [tips, setTips] = React.useState([]);
  const [selectedTips, setSelectedTips] = useState<TipModel[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryModel>();
  const token = localStorage.getItem("token") || null;
  const id = localStorage.getItem("id") || null;
  const [listCountry, setListCountry] = useState<CountryModel[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  function numberDay(dateDebutStr: string, dateFinStr: string) {
    const dateDebut = new Date(dateDebutStr);
    const dateFin = new Date(dateFinStr);
    const differenceMs: number = dateFin.getTime() - dateDebut.getTime();
    const differenceJours: number = differenceMs / (1000 * 60 * 60 * 24);
    return Math.floor(differenceJours);
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    try {
      if (token) {
        const countryList = await getCountryList(token);
        setListCountry(countryList);
      }
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  const handleFormSubmit = async (
    name: string,
    country: string,
    dateDebut: string,
    dateFin: string,
    isPublic: boolean
  ) => {
    if (token !== null && id !== null) {
      const tips = await getTipsByCountry(country, token);
      setTips(tips);
      setSelectedCountry(country);
      let numberDays: number = numberDay(dateDebut, dateFin);
      const newItinerary = {
        name: name,
        numberDay: numberDays,
        idCountry: country,
        dayOne: dateDebut,
        lastDay: dateFin,
        idCategory: "a39a34de-10d9-4ae8-8649-13c8de0a84bc",
        idUser: id,
        public: isPublic,
      };
      try {
        setItinerary(await createItinerary(newItinerary, token));
        toast.success("Itinéraire créé avec succès");
      } catch (error) {
        console.log("erreur creation tips" + error);
      }

      setIsTipsListVisible(true);
      setIsAddItineraryVisible(false);
    }
  };

  const handleTipSelect = (tip: TipModel) => {
    setSelectedTips([...selectedTips, tip]);
    toast.success("Ce tips a été ajouté à votre voyage");
  };

  const handleOrganizedDaysClick = () => {
    setIsTipsListVisible(false);
    setIsAddItineraryVisible(false);
    setIsItineraryVisible(true);
  };

  return (
    <>
      <div>
        <h1>Bienvenue sur ton itinéraire</h1>
        <Link to={`/add-Tips`}>
          <button>Créer un tips</button>
        </Link>
      </div>
      <div className="app">
        <h1>Planificateur d'Itinéraire</h1>
        {isAddItineraryVisible && (
          <AddItinerary onSubmit={handleFormSubmit} listCountry={listCountry} />
        )}
        <div className="content">
          {isTipsListVisible && (
            <div className="tips-list">
              <h2>Tips disponibles pour {selectedCountry}</h2>
              <TipsListComponent
                tips={tips}
                onTipSelect={handleTipSelect}
                onOrganizeDaysClick={handleOrganizedDaysClick}
              />
            </div>
          )}
          {isItineraryVisible && (
            <div className="itinerary">
              <h2>Itinéraire</h2>
              {itinerary && (
                <>
                  <OrganizeItinerary
                    itinerary={itinerary}
                    selectedTips={selectedTips}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ItineraryPage;
