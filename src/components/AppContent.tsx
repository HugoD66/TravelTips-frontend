import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/Homepage';
import DestinationsPage from '../pages/DestinationPage';
import ItineraryPage from '../pages/ItineraryPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/ProfilePage';
import NavBar from '../components/NavBar';
import AddTips from '../components/forms/AddTips';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-tips" element={<AddTips />} />
      </Routes>
    </>
  );
};

export default AppContent;
