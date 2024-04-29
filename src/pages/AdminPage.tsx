import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminUserInfo from "../components/admin/userInfo/AdminUserInfo";
import ApprovedTipsTable from "../components/admin/tips/ApprovateTipsTable";
import ApprovateItineraryTable from "../components/admin/itinerary/ApprovateItineraryTable";
import PendingTipsTable from "../components/admin/tips/PendingTipsTable";
import OtherTipsTable from "../components/admin/tips/OtherTipsTable";
import PendingItineraryTable from "../components/admin/itinerary/PendingItineraryTable";

const AdminPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [selectedComponent, setSelectedComponent] = useState<string>(
    params.get("parametre") || ""
  );

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
          <PendingTipsTable></PendingTipsTable>
          <ApprovedTipsTable></ApprovedTipsTable>
          <OtherTipsTable></OtherTipsTable>
        </div>
      )}
      {selectedComponent === "AdminItinerary" && (
        <div className="user-info-container">
          <PendingItineraryTable />
          <ApprovateItineraryTable />
          {/* Contenu du composant AdminItinerary */}
        </div>
      )}
    </div>
  );
};
export default AdminPage;
