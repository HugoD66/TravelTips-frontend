import React, { useState, useEffect } from "react";
import { getApproveTips } from "../../../services/tipService";
import { TipModel } from "../../../models/TipModel";

const ApprovedTipsTable: React.FC = () => {
  const [approvedTips, setApprovedTips] = useState<TipModel[]>([]);

  useEffect(() => {
    fetchApprovedTips();
  }, []);

  const fetchApprovedTips = async () => {
    try {
      const tips = await getApproveTips();
      setApprovedTips(tips);
    } catch (error) {
      console.error("Error fetching approved tips:", error);
    }
  };

  return (
    <div>
      <h2>Tips approuvés</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(approvedTips).map((key: string) => {
            const tip: TipModel = approvedTips[parseInt(key, 10)];
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

export default ApprovedTipsTable;
