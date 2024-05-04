import {ItineraryModel} from "../../../models/ItineraryModel";
import React from "react";
import moment from "moment/moment";

export interface UserItineraryTableProps {
  itineraries: ItineraryModel[];
  title: string;
}

const UserItineraryTable: React.FC<UserItineraryTableProps> = ({ itineraries, title }) => {
    return (
      <div>
        <div className="admin-table-container">
          <h2>{title}</h2>
        </div>
        <table className="admin-table">
          <thead>
          <tr>
            <th>Nom</th>
            <th>Premier jour</th>
            <th>Dernier jour</th>
            <th>Durée</th>
            <th>Catégorie</th>
          </tr>
          </thead>
          <tbody>
          {itineraries.map((itinerary: ItineraryModel) => (
            <tr key={itinerary.id}>
              <td>{itinerary.name}</td>
              <td>{moment(itinerary.dayOne).format('DD/MM/YYYY')}</td>
              <td>{moment(itinerary.lastDay).format('DD/MM/YYYY')}</td>
              <td>{itinerary.numberDay}</td>
              <td>{typeof itinerary.idCategory === "object" ? itinerary.idCategory.name : ""}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
}
export default UserItineraryTable;