import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../../styles/calendar.css";
import { TipModel } from "../../models/TipModel";
import { DayItineraryModel } from "../../models/DayItineraryModel";
import { ItineraryModel } from "../../models/ItineraryModel";
import AgendaPage from "./Agenda";
import Modal from "../../components/Modal";
import { createDayItinerary } from "../../services/dayItineraryService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [datesWithTips, setDatesWithTips] = useState<Date[]>([]);
  const token = localStorage.getItem("token") || null;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    const dates = dayItinerary.map(
      (dayItinerary: DayItineraryModel) => new Date(dayItinerary.date)
    );
    setDatesWithTips(dates);
  }, [dayItinerary]);

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
              setShowModal(false);
              setDayItinerary([]);
              toast.success("Votre itinéraire a été créé avec succès");

              navigation("/itinerary");
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

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const currentDate = date.toISOString().split("T")[0];
      if (
        datesWithTips.find((d) => d.toISOString().split("T")[0] === currentDate)
      ) {
        return <div className="blue-dot"></div>;
      }
    }
    return null;
  };

  return (
    <>
      <div>
        <div className="titleItinerary">
          <h1>Organise tes tips !</h1>
          <p>Sélectionnez une date pour afficher l'agenda :</p>
        </div>
        <div className="container">
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDate}
            tileContent={tileContent}
          />
          <button onClick={() => handleSubmit()}>Valider mon itinéraire</button>
        </div>
        {agendaVisible && (
          <div className="agenda-popup">
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <AgendaPage
                  date={selectedDate}
                  tips={selectedTips}
                  onAddTipClick={handleAddTip}
                  closeModal={() => setShowModal(false)}
                />
              </Modal>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrganizeItinerary;
