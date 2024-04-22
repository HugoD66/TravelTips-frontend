import React, { useState, useEffect } from "react";
import {
  approveTip,
  disapproveTip,
  getPendingTips,
} from "../../../services/tipService";
import { TipModel } from "../../../models/TipModel";

const PendingTipsTable: React.FC = () => {
  const [pendingTips, setPendingTips] = useState<TipModel[]>([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    fetchPendingTips();
  }, []);

  const fetchPendingTips = async () => {
    try {
      if (token !== null) {
        const tips = await getPendingTips(token);
        setPendingTips(tips);
      }
    } catch (error) {
      console.error("Error fetching pending tips:", error);
    }
  };

  const handleApprove = async (tipId: string) => {
    try {
      if (token !== null) {
        await approveTip(tipId, token);
        fetchPendingTips();
      }
    } catch (error) {
      console.error("Error approving tip:", error);
    }
  };

  const handleDisapprove = async (tipId: string) => {
    try {
      if (token !== null) {
        await disapproveTip(tipId, token);
        fetchPendingTips();
      }
    } catch (error) {
      console.error("Error disapproving tip:", error);
    }
  };

  return (
    <div>
      <h2>Tips en attente d'approbation</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(pendingTips).map((key: string) => {
            const tip: TipModel = pendingTips[parseInt(key, 10)];
            return (
              <tr key={tip.id}>
                <td>{tip.name}</td>
                <td>{tip.adress}</td>
                <td>{tip.price}</td>
                <td>
                  <button
                    onClick={() => tip && tip.id && handleApprove(tip.id)}
                  >
                    Approuver
                  </button>
                  <button
                    onClick={() => tip && tip.id && handleDisapprove(tip.id)}
                  >
                    Désapprouver
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PendingTipsTable;
