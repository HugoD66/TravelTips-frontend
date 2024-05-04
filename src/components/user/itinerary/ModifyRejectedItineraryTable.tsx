import React, {useEffect, useState} from "react";
import { UserItineraryTableProps } from './UserItineraryTable';
import {ItineraryModel} from "../../../models/ItineraryModel";
import Modal from "../../Modal";
import UpdateItinerary from "./UpdateItinerary";
import moment from "moment";

const ModifyRejectedItineraryTable: React.FC<UserItineraryTableProps> = ({ itineraries, title }) => {
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryModel | undefined>();
  const [showModal, setShowModal] = useState(false);
  
  const handleModify = (itineraryId: string) => {
    const selected = itineraries.find((itinerary) => itinerary.id === itineraryId);
    setSelectedItinerary(selected);
    setShowModal(true);
  }
  useEffect(() => {
  }, []);

  return (
    <>
      <div className="admin-table-container">
        <h2>{ title }</h2>
      </div>
      <table className="admin-table">
        <thead>
        <tr>
          <th>Nom</th>
          <th>Premier jour</th>
          <th>Dernier jour</th>
          <th>Durée</th>
          <th>Catégorie</th>
          <th>Action</th>
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

            <button onClick={() => itinerary.id && handleModify(itinerary.id)}>
              Modifier
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <UpdateItinerary selectedItinerary={selectedItinerary} />
              </Modal>
            )}
            {/*

            <td>{typeof itinerary.idCity === "object" ? itinerary.idCity.name : ""}</td>
            <td>
              {typeof itinerary.idCity === "object" ? itinerary.idCity.zipCode : ""}
            </td>
            <td>
              {itinerary.idCity &&
                typeof itinerary.idCity === "object" &&
                itinerary.idCity.idCountry &&
                typeof itinerary.idCity.idCountry === "object" &&
                itinerary.idCity.idCountry.name}
            </td>
            <td>{itinerary.price}</td>
            <td>
              {" "}

            </td>*/}
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}
export default ModifyRejectedItineraryTable;