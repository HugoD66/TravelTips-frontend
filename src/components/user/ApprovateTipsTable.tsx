import React, { useEffect, useState } from "react";
import { TipModel } from "../../models/TipModel";
import { getTipsUser } from "../../services/tipService";

const UserTipsTable: React.FC = () => {
  const [tips, setTips] = useState<TipModel[]>([]);
  const token: string | null = localStorage.getItem("token");
  const userId: string | null = localStorage.getItem("id");

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      if (token && userId) {
        const userTips = await getTipsUser(userId, token);
        setTips(userTips);
      }
    } catch (error) {
      console.error("Error fetching user tips:", error);
    }
  };

  const filterTipsByApprovate = (approvateStatus: string) => {
    return tips.filter((tip) => tip.approvate === approvateStatus);
  };

  return (
    <div>
      <h2>Mes tips en attente de validation</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {filterTipsByApprovate("pending").map((tip) => (
            <tr key={tip.id}>
              <td>{tip.name}</td>
              <td>{tip.adress}</td>
              <td>{tip.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Mes Tips en ligne</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filterTipsByApprovate("true").map((tip) => (
            <tr key={tip.id}>
              <td>{tip.name}</td>
              <td>{tip.adress}</td>
              <td>{tip.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Mes tips rejetées</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {filterTipsByApprovate("false").map((tip) => (
            <tr key={tip.id}>
              <td>{tip.name}</td>
              <td>{tip.adress}</td>
              <td>{tip.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTipsTable;
