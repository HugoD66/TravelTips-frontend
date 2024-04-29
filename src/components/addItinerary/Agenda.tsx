import React, { useState } from "react";
import { TipModel } from "../../models/TipModel";
import "../../styles/agenda.css";

const AgendaPage = ({
  date,
  tips,
  onAddTipClick,
  handleSubmit,
}: {
  date: Date;
  tips: TipModel[];
  onAddTipClick: (tip: TipModel, slot: string, date: string) => void;
  handleSubmit: () => void;
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedTipsBySlot, setSelectedTipsBySlot] = useState<{
    [key: string]: TipModel[];
  }>({});

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleAddTip = (tip: TipModel) => {
    if (selectedTimeSlot) {
      setSelectedTipsBySlot((prevSelectedTips) => ({
        ...prevSelectedTips,
        [selectedTimeSlot]: [
          ...(prevSelectedTips[selectedTimeSlot] || []),
          tip,
        ],
      }));
      onAddTipClick(tip, selectedTimeSlot, date.toISOString());
    }
  };

  return (
    <div className="agenda-page">
      <h3>Agenda pour {date.toDateString()}</h3>
      <div className="agenda-time-slots">
        {[
          "08:00 - 09:00",
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "12:00 - 14:00",
          "14:00 - 16:00",
          "16:00 - 18:00",
          "18:00 - 20:00",
          "20:00 - 22:00",
          "22:00 - 00:00",
        ].map((timeSlot, index) => (
          <div key={index} className="time-slot">
            <button onClick={() => handleTimeSlotClick(timeSlot)}>
              {timeSlot}
            </button>
            {selectedTipsBySlot[timeSlot] && (
              <div className="agenda-tips">
                {selectedTipsBySlot[timeSlot].map((tip, index) => (
                  <div key={index} className="agenda-tip">
                    <span>{tip.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="agenda-add-tip">
        {selectedTimeSlot && <h4>Choisissez un tip pour {selectedTimeSlot}</h4>}
        {tips.map((tip, index) => (
          <div key={index} className="agenda-tip">
            <span>{tip.name}</span>
            <button onClick={() => handleAddTip(tip)}>
              Ajouter le tip à cette journée
            </button>
          </div>
        ))}
        <button onClick={() => handleSubmit()}>Terminer l'itinéraire</button>
      </div>
    </div>
  );
};

export default AgendaPage;
