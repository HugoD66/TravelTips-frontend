import React, { useState, useEffect } from "react";
import { getDisapproveTips } from "../../../services/tipService";
import { TipModel } from "../../../models/TipModel";

const OtherTipsTable: React.FC = () => {
  const [otherTips, setOtherTips] = useState<TipModel[]>([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    if (token !== null) {
      fetchOtherTips(token);
    }
  }, []);

  const fetchOtherTips = async (token: string) => {
    try {
      const tips = await getDisapproveTips(token);
      setOtherTips(tips);
    } catch (error) {
      console.error("Error fetching other tips:", error);
    }
  };

  return (
    <div>
      <h2>Autres Tips</h2>
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
          {Object.keys(otherTips).map((key: string) => {
            const tip: TipModel = otherTips[parseInt(key, 10)];
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

export default OtherTipsTable;
