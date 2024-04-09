import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';

const GlobeAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 8000); // Supposons une animation combinée de 8 secondes

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="globe-animation">
      <div className="title">TravelTips</div>
      {/* Exemple d'utilisation d'un Globe - ajustez en fonction de l'API de votre bibliothèque */}
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        animateIn={true}
      />
    </div>
  );
};

export default GlobeAnimation;
