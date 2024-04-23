import React, { SetStateAction, useEffect, useState } from "react";
import { TipModel } from "../../models/TipModel";
import { getTipsUser } from "../../services/tipService";
import UpdateTips from "./UpdateTips";
import Modal from "../Modal";

const UserTipsTable: React.FC = () => {
  const [tips, setTips] = useState<TipModel[]>([]);
  const token: string | null = localStorage.getItem("token");
  const userId: string | null = localStorage.getItem("id");
  const [selectedTip, setSelectedTip] = useState<TipModel | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      if (token && userId) {
        const userTips = await getTipsUser(userId, token);
        setTips(userTips);
        console.log(userTips);
      }
    } catch (error) {
      console.error("Error fetching user tips:", error);
    }
  };
  const handleModify = (tipId: string) => {
    const selected = tips.find((tip) => tip.id === tipId);
    setSelectedTip(selected || null);
    setShowModal(true);
  };

  const filterTipsByApprovate = (approvateStatus: string) => {
    return tips.filter((tip) => tip.approvate === approvateStatus);
  };

  const filterTipsNoModify = (approvateStatus: string, nbApprovate: number) => {
    const tipsNoModify = tips.filter(
      (tip) =>
        tip.approvate === approvateStatus && tip.nbApprobation === nbApprovate
    );
    const tipsTest = tipsNoModify.filter(
      (tip) => tip.nbApprobation === nbApprovate
    );
    return tipsTest;
  };

  const filterTipsModify = (approvateStatus: string, nbApprovate: number) => {
    const tipsModify = tips.filter(
      (tip) =>
        tip.approvate === approvateStatus && tip.nbApprobation > nbApprovate
    );
    return tipsModify;
  };
  return (
    <div>
      <div>
        <h2>Mes tips en attente de validation</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Code Postale</th>
            <th>Pays</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {filterTipsByApprovate("pending").map((tip) => (
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
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Mes tips en ligne</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Code Postale</th>
            <th>Pays</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {filterTipsByApprovate("true").map((tip) => (
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
            </tr>
          ))}
        </tbody>
      </table>
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
          {filterTipsModify("false", 0).map((tip) => (
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
      <div>
        <h2>Mes tips rejetés non modifiables</h2>
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
          {filterTipsNoModify("false", 0).map((tip) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTipsTable;
