import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./components/AppContent";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
};

export default App;
