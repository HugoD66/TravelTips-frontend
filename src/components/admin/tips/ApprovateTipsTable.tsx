import React, { useState, useEffect } from "react";
import { getApproveTips } from "../../../services/tipService";
import { TipModel } from "../../../models/TipModel";
import '../../../styles/admin.css';

const ApprovedTipsTable: React.FC = () => {
  const [approvedTips, setApprovedTips] = useState<TipModel[]>([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    fetchApprovedTips();
  }, []);

  const fetchApprovedTips = async () => {
    try {
      if (token !== null) {
        const tips = await getApproveTips(token);

        setApprovedTips(tips);
      }
    } catch (error) {
      console.error("Error fetching approved tips:", error);
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-header">Tips approuvés</h2>
      <table className="admin-table">
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
          {Object.keys(approvedTips).map((key: string) => {
            const tip: TipModel = approvedTips[parseInt(key, 10)];
            return (
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedTipsTable;
