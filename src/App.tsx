import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import DestinationsPage from './pages/DestinationPage';
import ItineraryPage from './pages/ItineraryPage';
import ProfilePage from './pages/ProfilePage';
import GlobeAnimation from './components/GlobeAnimation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobeAnimation />} />
        <Route path="/home" element={<><NavBar /><HomePage /></>} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
