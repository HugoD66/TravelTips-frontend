import React, {useEffect, useState} from "react";
import {TipModel} from "../../../models/TipModel";
import {ItineraryModel} from "../../../models/ItineraryModel";
import {getApproveTips} from "../../../services/tipService";
import {getApproveItinerary} from "../../../services/itineraryService";
import {CategoryModel} from "../../../models/CategoryModel";
import {UserModel} from "../../../models/UserModel";

const ApprovateItineraryTable = () => {

  const [approvedItinerary, setApprovedItinerary] = useState<ItineraryModel[]>([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    fetchApprovedItinerary();
  }, []);

  const fetchApprovedItinerary = async () => {
    try {
      if (token !== null) {
        const itinerary = await getApproveItinerary(token);

        setApprovedItinerary(itinerary);
        console.log(itinerary)
      }
    } catch (error) {
      console.error("Error fetching approved tips:", error);
    }
  };

  return (
    <div>
      <h2>Itinéraires approuvés</h2>
      <table>
        <thead>
        <tr>
          <th>Nom</th>
          <th>Nombre de jours</th>
          <th>Jour de départ</th>
          <th>Dernier jour</th>
          <th>Catégorie</th>
          <th>Créé par</th>
        </tr>
        </thead>
        <tbody>
        {Object.keys(approvedItinerary).map((key: string) => {
          const itinerary: ItineraryModel = approvedItinerary[parseInt(key, 10)];
          return (
              <tr key={itinerary.id}>
                <td>{itinerary.name}</td>
                <td>{itinerary.numberDay}</td>
                <td>{itinerary.dayOne}</td>
                <td>{itinerary.lastDay}</td>
                <td>{typeof itinerary.idCategory === "object" ? itinerary.idCategory.name : "Non disponible"}</td>
                <td>{typeof itinerary.idUser === "object" ? itinerary.idUser.firstName : "Non disponible"}</td>
              </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovateItineraryTable;
