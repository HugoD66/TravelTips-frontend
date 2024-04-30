import React from "react";
import ApprovedTipsTable from "./ApprovateTipsTable";
import OtherTipsTable from "./OtherTipsTable";
import PendingTipsTable from "./PendingTipsTable";
import '../../../styles/admin.css';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <ApprovedTipsTable />
      <OtherTipsTable />
      <PendingTipsTable />
    </div>
  );
};

export default AdminDashboard;
