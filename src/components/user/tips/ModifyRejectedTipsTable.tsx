import { useEffect, useState } from "react";
import Modal from "../../Modal";
import UpdateTips from "./UpdateTips";
import { TipModel } from "../../../models/TipModel";

const ModifiableRejectedTipsTable: React.FC<{
  tips: TipModel[];
}> = ({ tips }) => {
  const [selectedTip, setSelectedTip] = useState<TipModel | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleModify = (tipId: string) => {
    const selected = tips.find((tip) => tip.id === tipId);
    setSelectedTip(selected || null);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <h2>Mes tips rejetés modifiables</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Code Postal</th>
            <th>Pays</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip) => (
            <tr key={tip.id}>
              <td>{tip.name}</td>
              <td>{tip.address}</td>
              <td>{typeof tip.idCity === "object" ? tip.idCity.name : ""}</td>
              <td>
                {typeof tip.idCity === "object" ? tip.idCity.zipCode : ""}
              </td>
              <td>
                {tip.idCity &&
                  typeof tip.idCity === "object" &&
                  tip.idCity.idCountry &&
                  typeof tip.idCity.idCountry === "object" &&
                  tip.idCity.idCountry.name}
              </td>
              <td>{tip.price}</td>
              <td>
                {" "}
                <button onClick={() => tip.id && handleModify(tip.id)}>
                  Modifier
                </button>
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <UpdateTips selectedTips={selectedTip} />
                  </Modal>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateTips selectedTips={selectedTip} />
        </Modal>
      )}
    </>
  );
};
export default ModifiableRejectedTipsTable;
