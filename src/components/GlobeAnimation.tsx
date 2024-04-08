import React, { useEffect } from 'react';
import Globe from 'react-globe.gl';

const GlobeAnimation = () => {
  useEffect(() => {
    // Rediriger vers la page d'accueil après l'animation
    const timer = setTimeout(() => {
      window.location.href = '/home';
    }, 8000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)"
      animateIn={true}
    />
  );
};

export default GlobeAnimation;
