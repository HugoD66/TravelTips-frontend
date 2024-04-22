import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminUserInfo from "../components/admin/AdminUserInfo";

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
      {selectedComponent === "adminUserInfo" && (
        <div className="user-info-container">
          <AdminUserInfo></AdminUserInfo>
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
