import React, {useEffect, useState} from "react";
import {ItineraryModel} from "../../../models/ItineraryModel";
import {getDisapproveItineraries} from "../../../services/itineraryService";

const OtherItinerariesTable = () => {
  const [itineraries, setItineraries] = useState<ItineraryModel[]>([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    if(token !== null) {
      fetchOtherItineraries(token);
    }
  }, []);

  const fetchOtherItineraries = async (token: string) => {
    try {
      const itineraries = await getDisapproveItineraries(token);
      setItineraries(itineraries);
    } catch (error) {
      console.error("Error fetching other itineraries:", error);
    }
  }

  return (
    <div>
      <h2>Itinéraires refusés</h2>
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
        {Object.keys(itineraries).map((key: string) => {
          const itinerary: ItineraryModel = itineraries[parseInt(key, 10)];
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
export default OtherItinerariesTable;