import React, { useEffect, useState } from "react";
import { TipModel } from "../../models/TipModel";
import { DayItineraryModel } from "../../models/DayItineraryModel";
import { ItineraryModel } from "../../models/ItineraryModel";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AgendaPage from "./Agenda";
import Modal from "../../components/Modal";
import { createDayItinerary } from "../../services/dayItineraryService";

interface OrganizeItineraryProps {
  itinerary: ItineraryModel;
  selectedTips: TipModel[];
}

const OrganizeItinerary: React.FC<OrganizeItineraryProps> = ({
  itinerary,
  selectedTips,
}) => {
  const [dayItinerary, setDayItinerary] = useState<DayItineraryModel[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [agendaVisible, setAgendaVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    initializeItinerary();
  }, []);

  const handleAddTip = (tip: TipModel, slot: string, date: string) => {
    const updatedDayItinerary = [...dayItinerary];
    let dateTrans = new Date(date);

    const newDayItinerary: DayItineraryModel = {
      slot: slot,
      date: dateTrans,
      idTips: tip.id,
      idItinerary: itinerary.id,
    };

    updatedDayItinerary.push(newDayItinerary);

    setDayItinerary(updatedDayItinerary);

    console.log(JSON.stringify(updatedDayItinerary));
  };

  const initializeItinerary = () => {
    const dayItineraryList = [];
    if (
      typeof itinerary.dayOne === "string" &&
      typeof itinerary.lastDay === "string"
    ) {
      let currentDate = new Date(itinerary.dayOne);
      while (currentDate <= new Date(itinerary.lastDay)) {
        const dayItinerary: DayItineraryModel = {
          date: currentDate,
          idItinerary: itinerary.id,
          idTips: [],
        };
        dayItineraryList.push(dayItinerary);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setDayItinerary(dayItineraryList);
    }
  };

  const handleSubmit = () => {
    if (dayItinerary.length > 0) {
      dayItinerary.forEach((day) => {
        if (token !== null) {
          createDayItinerary(day, token)
            .then((response) => {
              // Traitement en cas de succès
              console.log(
                "DayItinerary ajouté à la base de données :",
                response
              );
            })
            .catch((error) => {
              // Gérer les erreurs en cas d'échec de l'ajout
              console.error(
                "Erreur lors de l'ajout de DayItinerary à la base de données :",
                error
              );
            });
        }
      });
    } else {
      console.log("Aucun DayItinerary à ajouter à la base de données.");
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setAgendaVisible(true);
    setShowModal(true);
  };

  const renderTips = () => {
    const dayIndex = dayItinerary.findIndex(
      (day) => day.date.toDateString() === selectedDate.toDateString()
    );
    if (dayIndex !== -1) {
      const tips = dayItinerary[dayIndex].idTips;
      return (
        <ul>
          {typeof tips === "object" ? (
            tips.length > 0 ? (
              tips.map((tip, index) => <li key={index}>{tip.name}</li>)
            ) : (
              <p>'Pas de tips trouvés'</p>
            )
          ) : (
            <p>'Pas de tips trouvés'</p>
          )}
        </ul>
      );
    }
  };

  return (
    <>
      <div>
        <h2>Calendrier</h2>
        <p>Sélectionnez une date pour afficher l'agenda :</p>
        <Calendar onClickDay={handleDateClick} value={selectedDate} />
        {agendaVisible && (
          <div className="agenda-popup">
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <AgendaPage
                  date={selectedDate}
                  tips={selectedTips}
                  onAddTipClick={handleAddTip}
                  handleSubmit={handleSubmit}
                ></AgendaPage>
                {renderTips()}
              </Modal>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrganizeItinerary;
