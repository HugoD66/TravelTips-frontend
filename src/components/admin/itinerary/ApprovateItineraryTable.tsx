import React, {useEffect, useState} from "react";
import {TipModel} from "../../../models/TipModel";
import {ItineraryModel} from "../../../models/ItineraryModel";
import {getApproveTips} from "../../../services/tipService";
import {getApproveItinerary} from "../../../services/itineraryService";
import {CategoryModel} from "../../../models/CategoryModel";
import {UserModel} from "../../../models/UserModel";
import moment from "moment/moment";

const ApprovateItineraryTable = () => {

  const [approvedItinerary, setApprovedItinerary] = useState<ItineraryModel[]>([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    fetchApprovedItinerary();
  }, [approvedItinerary]);

  const fetchApprovedItinerary = async () => {
    try {
      if (token !== null) {
        const itinerary = await getApproveItinerary(token);

        setApprovedItinerary(itinerary);
      }
    } catch (error) {
      console.error("Error fetching approved tips:", error);
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-header">Itinéraires approuvés</h2>
      <table className="admin-table">
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
                <td>{moment(itinerary.dayOne).format('DD/MM/YYYY')}</td>
                <td>{moment(itinerary.lastDay).format('DD/MM/YYYY')}</td>
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
