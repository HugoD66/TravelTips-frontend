import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';
import '../styles/globeanimation.css';

const GlobeAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000); // durée de 8s

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="globe-animation">
      <div className="title">TravelTips</div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
};

export default GlobeAnimation;
