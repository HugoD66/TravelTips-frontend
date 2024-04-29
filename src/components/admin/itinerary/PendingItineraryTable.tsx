import React, { useState, useEffect } from "react";
import {
  approveItinerary, disapproveItinerary, getPendingItinerary,
} from "../../../services/itineraryService";
import {ItineraryModel} from "../../../models/ItineraryModel";

const PendingItineraryTable: React.FC = () => {
  const [pendingItinerary, setPendingItinerary] = useState<ItineraryModel[]>([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    fetchPendingItinerary();
  }, []);

  const fetchPendingItinerary = async () => {
    try {
      if (token !== null) {
        const itinerarys = await getPendingItinerary(token);
        setPendingItinerary(itinerarys);
        console.log(itinerarys);
      }
    } catch (error) {
      console.error("Error fetching pending itinerarys:", error);
    }
  };

  const handleApprove = async (itineraryId: string) => {
    try {
      if (token !== null) {
        await approveItinerary(itineraryId, token);
        fetchPendingItinerary();
      }
    } catch (error) {
      console.error("Error approving itinerary:", error);
    }
  };

  const handleDisapprove = async (itineraryId: string) => {
    try {
      if (token !== null) {
        await disapproveItinerary(itineraryId, token);
        fetchPendingItinerary();
      }
    } catch (error) {
      console.error("Error disapproving itinerary:", error);
    }
  };

  return (
    <div>
      <h2>Itineraires en attente d'approbation</h2>
      <table>
        <thead>
        <tr>
          <th>Nom</th>
          <th>Nombre de jours</th>
          <th>Jour 1 </th>
          <th>Dernier jour</th>
          <th>Catégorie</th>
          <th>Créé par : </th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {Object.keys(pendingItinerary).map((key: string) => {
          const itinerary: ItineraryModel = pendingItinerary[parseInt(key, 10)];
          return (
            <tr key={itinerary.id}>
              <td>{itinerary.name}</td>
              <td>{itinerary.numberDay}</td>
              <td>{itinerary.dayOne}</td>
              <td>{itinerary.lastDay}</td>
              <td>{typeof itinerary.idCategory === "object" ? itinerary.idCategory.name : ""}</td>
              <td>{typeof itinerary.idUser === "object" ? itinerary.idUser.firstname : ""}</td>
              <td>
                <button
                  onClick={() => itinerary && itinerary.id && handleApprove(itinerary.id)}
                >
                  Approuver
                </button>
                <button
                  onClick={() => itinerary && itinerary.id && handleDisapprove(itinerary.id)}
                >
                  Désapprouver
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  )
    ;
};

export default PendingItineraryTable;
