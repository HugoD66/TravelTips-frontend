import React, { useState, useEffect } from "react";
import { getDisapproveTips } from "../../../services/tipService";
import { TipModel } from "../../../models/TipModel";

const OtherTipsTable: React.FC = () => {
  const [otherTips, setOtherTips] = useState<TipModel[]>([]);

  useEffect(() => {
    fetchOtherTips();
  }, []);

  const fetchOtherTips = async () => {
    try {
      const tips = await getDisapproveTips();
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
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(otherTips).map((key: string) => {
            const tip: TipModel = otherTips[parseInt(key, 10)];
            return (
              <tr key={tip.id}>
                <td>{tip.name}</td>
                <td>{tip.adress}</td>
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
