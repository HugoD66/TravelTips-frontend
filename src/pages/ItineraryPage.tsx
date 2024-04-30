import React, { useEffect, useState } from "react";
import { getDayInItineraryList } from "../services/dayItineraryService";
import { ItineraryModel } from "../models/ItineraryModel";
import { DayItineraryModel } from "../models/DayItineraryModel";
import { TipModel } from "../models/TipModel";
import { Link } from "react-router-dom";

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState<ItineraryModel[]>([]);
  const [selectedItinerary, setSelectedItinerary] =
    useState<ItineraryModel | null>(null);
  const [dayItineraries, setDayItineraries] = useState<DayItineraryModel[]>([]);
  const [tips, setTips] = useState<TipModel[]>([]);
  const token = localStorage.getItem("token") || null; // Vérifie si l'utilisateur est connecté

  useEffect(() => {
    fetchItinerary()
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

  // Fonction pour afficher les dayItineraries et les tips associés à l'itinéraire sélectionné
  const handleItineraryClick = (dayItinerary: DayItineraryModel) => {
    dayItineraries.push(dayItinerary);
    if (
      typeof dayItinerary.idItinerary === "object" &&
      typeof dayItinerary.idTips === "object"
    ) {
      itineraries.push(dayItinerary.idItinerary);
      tips.push(dayItinerary.idTips);
    }
  };

  // Fonction pour créer un nouvel itinéraire (à implémenter selon votre logique)
  const handleCreateItinerary = () => {
    // Rediriger vers la page de création d'itinéraire ou afficher un formulaire de création d'itinéraire
    console.log("Créer un nouvel itinéraire");
  };

  return (
    <div>
      <h2>Tous les itinéraires</h2>
      <ul>
        {dayItineraries.map((dayItinerary) => (
          <li
            key={dayItinerary.id}
            onClick={() => handleItineraryClick(dayItinerary)}
          >
            {dayItinerary && (
              <div>
                {typeof dayItinerary.date === "object" && (
                  <p>Date: {new Date(dayItinerary.date).toISOString()}</p>
                )}
                {typeof dayItinerary.idItinerary === "object" &&
                  dayItinerary.idItinerary.name &&
                  dayItinerary.idItinerary.dayOne &&
                  dayItinerary.idItinerary.lastDay &&
                  dayItinerary.idItinerary.idCategory && (
                    <>
                      <p>
                        Nom de l'itinéraire: {dayItinerary.idItinerary.name}
                      </p>
                      <p>Date de début : {dayItinerary.idItinerary.dayOne}</p>

                      <p>Date de fin: {dayItinerary.idItinerary.lastDay}</p>
                    </>
                  )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {selectedItinerary && (
        <div>
          <h3>{selectedItinerary.name}</h3>
          <h4>Day Itineraries</h4>
          <ul>
            {dayItineraries.map((dayItinerary) => (
              <li key={dayItinerary.id}>
                {dayItinerary.date.toISOString()} - Slot: {dayItinerary.slot}
              </li>
            ))}
          </ul>
          <h4>Tips</h4>
          <ul>
            {tips.map((tip) => (
              <li key={tip.id}>{tip.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Affiche le bouton pour créer un nouvel itinéraire uniquement si l'utilisateur est connecté */}
      {token && (
        <Link to={"/add-itinerary"}>
          <button onClick={handleCreateItinerary}>
            Créer un nouvel itinéraire
          </button>
        </Link>
      )}
    </div>
  );
};

export default ItineraryPage;
