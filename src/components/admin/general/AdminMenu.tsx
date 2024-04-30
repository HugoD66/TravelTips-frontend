import { useState } from "react";
import "../../../styles/burgermenu.css";
import { useNavigate } from "react-router-dom";

const AdminMenu = ({ deco }: { deco: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInfoClick = () => {
    navigation(`/AdminPage?parametre=${"adminUserInfo"}`);
  };

  const handleUserTipsClick = () => {
    navigation(`/AdminPage?parametre=${"AdminTips"}`);
  };

  const handleUserItineraryClick = () => {
    navigation(`/AdminPage?parametre=${"AdminItinerary"}`);
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
        <button onClick={handleUserTipsClick}>Gérer les tips</button>
        <button onClick={handleUserItineraryClick}>
          Gérer les itinéraires
        </button>
        <button onClick={handleUserInfoClick}>Gérer les utilisateurs</button>
        <button onClick={deco}>Déconnexion</button>
      </div>
    </div>
  );
};

export default AdminMenu;
