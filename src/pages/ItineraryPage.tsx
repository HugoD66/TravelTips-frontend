import React, { useEffect, useState } from "react";
import { getDayInItineraryList } from "../services/dayItineraryService";
import { ItineraryModel } from "../models/ItineraryModel";
import { DayItineraryModel } from "../models/DayItineraryModel";
import { TipModel } from "../models/TipModel";
import { Link } from "react-router-dom";
const ItineraryPage = () => {
  const [dayItineraries, setDayItineraries] = useState<DayItineraryModel[]>([]);
  const token = localStorage.getItem("token") || null;
  const dayItinerariesByItinerary: { [key: string]: DayItineraryModel[] } = {};

  useEffect(() => {
    getDayInItineraryList()
      .then((data) => {
        setDayItineraries(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des itinéraires :",
          error
        );
      });
  }, []);

  // Objet pour stocker les itinéraires uniques et leurs tips associés
  const uniqueItineraries: {
    [key: string]: { itinerary: ItineraryModel; tips: TipModel[] };
  } = {};

  // Traitement des dayItineraries pour obtenir les itinéraires uniques
  dayItineraries.forEach((dayItinerary) => {
    const itinerary = dayItinerary.idItinerary;
    if (itinerary && typeof itinerary === "object") {
      const itineraryId = itinerary.id;
      if (itineraryId) {
        // Vérification de la définition de itineraryId
        if (!(itineraryId in uniqueItineraries)) {
          uniqueItineraries[itineraryId] = { itinerary, tips: [] };
        }
        if (Array.isArray(dayItinerary.idTips)) {
          uniqueItineraries[itineraryId].tips.push(...dayItinerary.idTips);
        }
      }
    }
  });

  return (
    <div>
      <h2>Tous les itinéraires</h2>
      <ul>
        {Object.values(uniqueItineraries).map(({ itinerary, tips }) => (
          <li key={itinerary.id}>
            <div>
              <h3>{itinerary.name}</h3>
              <p>
                Date de début :{" "}
                {itinerary.dayOne && new Date(itinerary.dayOne).toISOString()}
              </p>
              <p>
                Date de fin :{" "}
                {itinerary.lastDay && new Date(itinerary.lastDay).toISOString()}
              </p>
              {Object.entries(dayItinerariesByItinerary).map(
                ([itineraryId, dayItineraries]) => (
                  <div key={itineraryId}>
                    <h4>Day Itineraries for Itinerary {itineraryId}</h4>
                    <ul>
                      {dayItineraries.map((dayItinerary) => (
                        <li key={dayItinerary.id}>{dayItinerary.slot}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </li>
        ))}
      </ul>

      {token && (
        <Link to={"/add-itinerary"}>
          <button>Créer un nouvel itinéraire</button>
        </Link>
      )}
    </div>
  );
};

export default ItineraryPage;
