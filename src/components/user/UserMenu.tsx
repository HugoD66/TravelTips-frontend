import { useState } from "react";
import "../../styles/BurgerMenu.css";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ deco }: { deco: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInfoClick = () => {
    navigation(`/profile?parametre=${"userInfo"}`);
  };

  const handleUserTipsClick = () => {
    navigation(`/profile?parametre=${"userTips"}`);
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
        <button>Mes itinéraires</button>
        <button onClick={handleUserTipsClick}>Mes tips</button>
        <button onClick={deco}>Déconnexion</button>
      </div>
    </div>
  );
};

export default UserMenu;
