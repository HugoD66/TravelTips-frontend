import React, { useEffect, useState } from "react";
import { TipModel } from "../../models/TipModel";
import { DayItineraryModel } from "../../models/DayItineraryModel";
import { ItineraryModel } from "../../models/ItineraryModel";
import "react-calendar/dist/Calendar.css";

interface OrganizeItineraryProps {
  itinerary: ItineraryModel;
  selectedTips: TipModel[];
}

const OrganizeItinerary: React.FC<OrganizeItineraryProps> = ({
  itinerary,
  selectedTips,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayItinerary, setDayItinerary] = useState<DayItineraryModel[]>([]);

  // Créer un DayItineraryModel pour chaque jour de l'itinéraire
  const initializeItinerary = () => {
    const dayItineraryList = [];
    if (typeof itinerary.dayOne === "object") {
      let currentDate = new Date(itinerary.dayOne);
      let numberOfDays = itinerary.numberDay;
      for (let i = 0; i < numberOfDays; i++) {
        const dayItinerary: DayItineraryModel = {
          date: currentDate,
          idItinerary: itinerary.id,
        };
        dayItineraryList.push(dayItinerary);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setDayItinerary(dayItineraryList);
    }
  };

  // Appeler initializeItinerary lors du premier rendu
  useEffect(() => {
    initializeItinerary();
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTip = (tip: TipModel) => {
    const dayIndex = dayItinerary.findIndex((day) => day.date === selectedDate);
    if (dayIndex !== -1) {
      const updatedDayItinerary = [...dayItinerary];
      let ajoutTip: TipModel = tip;
      if (
        updatedDayItinerary[dayIndex].idTips !== undefined &&
        typeof updatedDayItinerary[dayIndex].idTips !== "string"
      ) {
        const idTips = updatedDayItinerary[dayIndex].idTips;
        if (Array.isArray(idTips)) {
          idTips.push(ajoutTip);
        }
      }
      setDayItinerary(updatedDayItinerary);
    }
  };

  const renderTips = () => {
    const dayIndex = dayItinerary.findIndex((day) => day.date === selectedDate);
    if (dayIndex !== -1) {
      const tips = dayItinerary[dayIndex].idTips;
      return (
        <ul>
          {typeof tips === "object" ? (
            tips.map((tip, index) => <li key={index}>{tip.name}</li>)
          ) : (
            <p>'Pas de tips trouvés'</p>
          )}
        </ul>
      );
    }
  };

  // Générer des dates pour afficher dans le calendrier
  const generateDates = () => {
    const dates = [];
    if (
      typeof itinerary.dayOne === "string" &&
      typeof itinerary.lastDay === "string"
    ) {
      let currentDate = new Date(itinerary.dayOne);
      while (currentDate <= new Date(itinerary.lastDay)) {
        dates.push(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
      console.log("les dates sont : " + dates);
      return dates;
    }
  };

  // Rendu du calendrier
  const renderCalendar = () => {
    const dates = generateDates();
    return (
      <div className="calendar">
        {Array.isArray(dates) ? (
          dates.map((date, index) => (
            <div key={index} onClick={() => handleDateClick(new Date(date))}>
              {date}
            </div>
          ))
        ) : (
          <p>'Erreur calendrier'</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div>
        <h2>Calendrier</h2>
        <p>Sélectionnez une date pour ajouter des tips :</p>
        {renderCalendar()}
        <div>
          <h3>Ajouter un tip pour {selectedDate.toDateString()}</h3>
          <select
            onChange={(e) =>
              handleAddTip(selectedTips[parseInt(e.target.value)])
            }
          >
            <option value="">Choisir un tip</option>
            {selectedTips.map((tip, index) => (
              <option key={index} value={index}>
                {tip.name}
              </option>
            ))}
          </select>
          {renderTips()}
        </div>
      </div>
    </>
  );
};
export default OrganizeItinerary;
