import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Homepage';
import DestinationsPage from './pages/DestinationPage';
import ItineraryPage from './pages/ItineraryPage';
import ProfilePage from './pages/ProfilePage';
import GlobeAnimation from './components/GlobeAnimation';

const AppContent = () => {
  let location = useLocation(); 

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<GlobeAnimation />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
