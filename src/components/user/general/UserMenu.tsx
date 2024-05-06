import { useState, useEffect } from "react";
import "../../../styles/burgermenu.css";
import { useNavigate, useLocation } from "react-router-dom";

const UserMenu = ({ deco }: { deco: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Mettre à jour l'état isOpen à false chaque fois que l'emplacement change
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInfoClick = () => {
    navigation(`/profile?parametre=${"userInfo"}`);
    setIsOpen(false); // Mettre à jour l'état de isOpen
  };

  const handleUserTipsClick = () => {
    navigation(`/profile?parametre=${"userTips"}`);
    setIsOpen(false); // Mettre à jour l'état de isOpen
  };

  const handleUserItineraryClick = () => {
    navigation(`/profile?parametre=${"userItinerary"}`);
    setIsOpen(false); // Mettre à jour l'état de isOpen
  };

  return (
    <div className="burger-menu">
      <div
        className={`burger-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <button onClick={handleUserInfoClick}>Mes informations</button>
        <button onClick={handleUserItineraryClick}>Mes itinéraires</button>
        <button onClick={handleUserTipsClick}>Mes tips</button>
        <button onClick={deco}>Déconnexion</button>
      </div>
    </div>
  );
};

export default UserMenu;
