import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./components/AppContent";
import { ToastContainer } from "react-toastify";
import CityProvider from "./context/CityProvider";
import TipProvider from "./context/TipProvider";

const App = () => {
  return (

<CityProvider>
  <TipProvider>
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  </TipProvider>
</CityProvider>
  );
};

export default App;
