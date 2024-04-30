import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import DestinationsPage from "../pages/DestinationPage";
import ItineraryPage from "../pages/ItineraryPage";
import ProfilePage from "../pages/ProfilePage";
import NavBar from "../components/NavBar";
import AdminPage from "../pages/AdminPage";
import AddTips from "./forms/AddTips";
import CountryPage from "../pages/CountryPage";
import CreateItineraryPage from "../pages/CreateItineraryPage";
import ItineraryDetail from "../pages/ItineraryDetail";
import TipsPage from "../pages/TipsPage";
import Footer from "../components/Footer";

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-tips" element={<AddTips />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/add-itinerary" element={<CreateItineraryPage />} />
        <Route path="/itineraries/:id" element={<ItineraryDetail />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/country/:countryName" element={<CountryPage />} />
        <Route
          path="/profile"
          element={<ProfilePage handleLogin={handleLogin} />}
        />
        <Route path="/tips/:tipId" element={<TipsPage />} />  {/* New route for TipsPage */}
      </Routes>
      <Footer />
    </>
  );
};

export default AppContent;
