import React, {useState} from "react";
import { UserItineraryTableProps } from './UserItineraryTable';
import {ItineraryModel} from "../../../models/ItineraryModel";
import Modal from "../../Modal";

const ModifyRejectedItineraryTable: React.FC<UserItineraryTableProps> = ({ itineraries, title }) => {
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryModel | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const handleModify = (itineraryId: string) => {
    const selected = itineraries.find((itinerary) => itinerary.id === itineraryId);
    setSelectedItinerary(selected || null);
    setShowModal(true);
  }
  
  return (
    <>
      <div className="admin-table-container">
        <h2>{ title }</h2>
      </div>
      <table className="admin-table">
        <thead>
        <tr>
          <th>Nom</th>
          <th>Adresse</th>
          <th>Ville</th>
          <th>Code Postal</th>
          <th>Pays</th>
          <th>Prix</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {itineraries.map((itinerary: ItineraryModel) => (
          <tr key={itinerary.id}>
            {/*<td>{itinerary.name}</td>
            <td>{itinerary.address}</td>
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
              <button onClick={() => itinerary.id && handleModify(itinerary.id)}>
                Modifier
              </button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <Updateitinerarys selecteditinerarys={selecteditinerary}/>
                </Modal>
              )}
            </td>*/}
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}
export default ModifyRejectedItineraryTable;