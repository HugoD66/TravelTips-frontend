import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AdminPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = localStorage.getItem("token");
  const [selectedComponent, setSelectedComponent] = useState<string>(
    params.get("parametre") || ""
  );
  const idUser = localStorage.getItem("id");

  useEffect(() => {
    setSelectedComponent(params.get("parametre") || "");
  }, [params]);

  return (
    <div>
      {selectedComponent === "userInfo" && (
        <div className="user-info-container">
          {/* Contenu du composant UserInfo */}
        </div>
      )}
      {selectedComponent === "AdminTips" && (
        <div className="user-info-container">
          {/* Contenu du composant AdminTips */}
        </div>
      )}
      {selectedComponent === "AdminItinerary" && (
        <div className="user-info-container">
          {/* Contenu du composant AdminItinerary */}
        </div>
      )}
    </div>
  );
};
export default AdminPage;
