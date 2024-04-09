import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/"><img src="/images/logo.png" alt="Logo" /></Link>
      </div>
      <button className="burger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/home">Homepage</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/itinerary">My Itinerary</Link>
        <div className="nav-profile">
          <Link to="/profile">Profile</Link>
          <Link to="/profile"><img src="/images/traveller.png" alt="Profile" /></Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;