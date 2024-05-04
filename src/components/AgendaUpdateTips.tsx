import React, { useState } from "react";
import { TipModel } from "../models/TipModel";
import { toast } from "react-toastify";
interface AgendaUpdateTipsProps {
  date: Date;
  tip: TipModel;
  onAddTipClick: (tip: TipModel, slot: string, date: Date) => void;
}

const AgendaUpdateTips: React.FC<AgendaUpdateTipsProps> = ({ date, tip, onAddTipClick }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isTipAdded, setIsTipAdded] = useState<boolean>(false);

  const handleTimeSlotClick = (timeSlot: string) => {
    if (isTipAdded) {
      toast.error("Un tip a déjà été ajouté à cette tranche horaire.");
      return;
    }
    setSelectedTimeSlot(timeSlot);
  };

  const handleAddTip = () => {
    if (selectedTimeSlot && !isTipAdded) {
      setIsTipAdded(true);
      onAddTipClick(tip, selectedTimeSlot, date);
    }
  };

  return (
    <div className="agenda-page">
      <h3>Agenda pour le {date.toLocaleDateString()}</h3>
      <div className="agenda-time-slots">
        {["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
          "12:00 - 14:00",
          "14:00 - 16:00",
          "16:00 - 18:00",
          "18:00 - 20:00",
          "20:00 - 22:00",
          "22:00 - 00:00",].map(slot => (
          <div key={slot} className={`time-slot ${selectedTimeSlot === slot ? "selected" : ""}`} onClick={() => handleTimeSlotClick(slot)}>
            {slot}
          </div>
        ))}
      </div>
      {selectedTimeSlot && (
        <button className="add-tip-button" onClick={handleAddTip} disabled={isTipAdded}>
          Ajouter le Tip à {selectedTimeSlot}
        </button>
      )}
    </div>
  );
};

export default AgendaUpdateTips;
