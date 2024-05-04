import React, { useState } from "react";
import { TipModel } from "../../models/TipModel";
import "../../styles/agenda.css";
import { toast } from "react-toastify";

const AgendaPage = ({
  date,
  tips,
  onAddTipClick,
  closeModal,
}: {
  date: Date;
  tips: TipModel[];
  onAddTipClick: (tip: TipModel, slot: string, date: string) => void;
  closeModal?: () => void;
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedTipsBySlot, setSelectedTipsBySlot] = useState<{
    [key: string]: TipModel[];
  }>({});

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleRemoveTip = (timeSlot: string, tipIndex: number) => {
    setSelectedTipsBySlot((prevSelectedTips) => {
      const updatedTips = prevSelectedTips[timeSlot].filter(
        (_, index) => index !== tipIndex
      );
      if (updatedTips.length === 0) {
        const { [timeSlot]: _, ...remainingTips } = prevSelectedTips;
        return remainingTips;
      } else {
        return { ...prevSelectedTips, [timeSlot]: updatedTips };
      }
    });
  };

  const handleAddTip = (tip: TipModel) => {
    if (selectedTimeSlot) {
      if (selectedTipsBySlot[selectedTimeSlot]) {
        toast.error("Un tips est déjà sélectionné pour cette plage horaire");
        return;
      }
      setSelectedTipsBySlot((prevSelectedTips) => ({
        ...prevSelectedTips,
        [selectedTimeSlot]: [tip],
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
                    <button onClick={() => handleRemoveTip(timeSlot, index)}>
                      X
                    </button>
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
        <button onClick={() => closeModal!()}>Valider cette journée</button>
      </div>
    </div>
  );
};

export default AgendaPage;
