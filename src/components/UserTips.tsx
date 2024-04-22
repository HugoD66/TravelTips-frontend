import React, { useState, useEffect } from "react";
import { getTipListUser } from "../services/tipService";
import { TipModel } from "../models/TipModel";

const UserTips = () => {
  const [tips, setTips] = useState<TipModel[]>([]);
  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    if (idUser !== null) {
      getTipListUser(idUser)
        .then((response) => {
          console.log("Tips récupérés avec succès : ", response);
          setTips(response);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération :", error);
        });
    }
  }, []);

  return (
    <div className="user-tips">
      {tips.map((tip, index) => (
        <div key={index} className="tip-card">
          <h3>{tip.name}</h3>
          <p>
            Adresse: {tip.adress}
          </p>
          <p>Prix: {tip.price}/5</p>
        </div>
      ))}
    </div>
  );
};

export default UserTips;
