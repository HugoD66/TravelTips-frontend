import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'; 
import Destination from './pages/Destination'; 
import GlobeAnimation from './components/GlobeAnimation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobeAnimation />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/destination" element={<Destination />} />
      </Routes>
    </Router>
  );
};

export default App;