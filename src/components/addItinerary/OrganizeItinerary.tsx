// import React, { useState } from "react";
// import { TipModel } from "../../models/TipModel";
// import { DayItineraryModel } from "../../models/DayItineraryModel";
// import { ItineraryModel } from "../../models/ItineraryModel";

// interface OrganizeItineraryProps {
//   itinerary: ItineraryModel;
//   selectedTips: TipModel[];
//   onTipSelect: (tip: TipModel) => void;
// }

// const OrganizeItinerary: React.FC<OrganizeItineraryProps> = ({
//   itinerary,
//   selectedTips,
//   onTipSelect,
// }) => {
//   const [selectedDayIndex, setSelectedDayIndex] = useState(0);
//   const [selectedTipIndex, setSelectedTipIndex] = useState(0);

//   const handleDaySelect = (dayIndex: number) => {
//     setSelectedDayIndex(dayIndex);
//     setSelectedTipIndex(0);
//   };

//   const handleTipSelect = (tipIndex: number) => {
//     setSelectedTipIndex(tipIndex);
//   };

//   const handleAddTipToDay = () => {
//     if (selectedDayIndex !== null && selectedTipIndex !== null) {
//       const selectedDay = itinerary[selectedDayIndex];
//       const selectedTip = selectedTips[selectedTipIndex];
//       // Ajouter le tip à la journée sélectionnée
//       // selectedDay.push(selectedTip.id);
//       onTipSelect(selectedTip); // Mettre à jour la liste des tips sélectionnés
//     }
//   };

//   const handleRemoveTipFromDay = (tipIndex) => {
//     if (selectedDayIndex !== null) {
//       const selectedDay = itinerary[selectedDayIndex];
//       // Supprimer le tip de la journée sélectionnée
//       selectedDay.tips.splice(tipIndex, 1);
//       onTipSelect(null); // Mettre à jour la liste des tips sélectionnés
//     }
//   };

//   const handleMoveTipUp = (tipIndex) => {
//     if (selectedDayIndex !== null && tipIndex > 0) {
//       const selectedDay = itinerary[selectedDayIndex];
//       // Permuter le tip avec celui qui le précède dans la liste
//       [selectedDay.tips[tipIndex - 1], selectedDay.tips[tipIndex]] = [
//         selectedDay.tips[tipIndex],
//         selectedDay.tips[tipIndex - 1],
//       ];
//     }
//   };

//   const handleMoveTipDown = (tipIndex) => {
//     if (
//       selectedDayIndex !== null &&
//       tipIndex < itinerary[selectedDayIndex].tips.length - 1
//     ) {
//       const selectedDay = itinerary[selectedDayIndex];
//       // Permuter le tip avec celui qui le suit dans la liste
//       [selectedDay.tips[tipIndex], selectedDay.tips[tipIndex + 1]] = [
//         selectedDay.tips[tipIndex + 1],
//         selectedDay.tips[tipIndex],
//       ];
//     }
//   };

//   return (
//     <div>
//       <h2>Organiser l'itinéraire</h2>
//       <div className="itinerary-days">
//         {itinerary.map((day, index) => (
//           <div key={index}>
//             <h3>Journée {index + 1}</h3>
//             <button onClick={() => handleDaySelect(index)}>
//               Ajouter un tip
//             </button>
//             <ul>
//               {day.idTips.map((tip, tipIndex) => (
//                 <li key={tipIndex}>
//                   {tip.name}
//                   <button onClick={() => handleMoveTipUp(tipIndex)}>↑</button>
//                   <button onClick={() => handleMoveTipDown(tipIndex)}>↓</button>
//                   <button onClick={() => handleRemoveTipFromDay(tipIndex)}>
//                     Supprimer
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//       {selectedDayIndex !== null && (
//         <div>
//           <h3>Sélectionner un tip</h3>
//           <ul>
//             {selectedTips.map((tip, index) => (
//               <li key={index}>
//                 {tip.name}
//                 <button onClick={() => handleTipSelect(index)}>
//                   Sélectionner
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button onClick={handleAddTipToDay}>Ajouter</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrganizeItinerary;
