import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./components/AppContent";
import { ToastContainer } from "react-toastify";
import CityProvider from "./context/CityProvider";

const App = () => {
  return (

<CityProvider>
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
</CityProvider>
  );
};

export default App;
