import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/Homepage";
import DestinationsPage from "../pages/DestinationPage";
import ItineraryPage from "../pages/ItineraryPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/ProfilePage";
import NavBar from "../components/NavBar";

const AppContent = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction de rappel pour mettre à jour l'état de connexion
  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      {location.pathname !== "/" && (
        <NavBar isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      )}
      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route
          path="/profile"
          element={<ProfilePage handleLogin={handleLogin} />}
        />
      </Routes>
    </>
  );
};

export default AppContent;
