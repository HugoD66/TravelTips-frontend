import { useEffect, useState } from "react";
import { getMe, updateMe } from "../services/userService";
import UserInfo from "./UserInfo";
import UserForm from "./forms/UserForm";
import "../styles/BurgerMenu.css";

const UserMenu = ({ deco }: { deco: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("id");

  useEffect(() => {
    if (token !== null && idUser !== null) {
      getMe(token, idUser).then((response) => {
        setUserData(response);
      });
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInfoClick = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idUser !== null && token !== null) {
      updateMe(
        idUser,
        userData.firstName,
        userData.lastName,
        userData.birthday,
        userData.email,
        userData.password,
        token
      ).then((response) => {
        setUserData(response);
      });
    }
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
        <button>Mes tips</button>
        <button onClick={deco}>Déconnexion</button>
      </div>
      {showUserInfo && (
        <div className="user-info-container">
          <UserInfo userData={userData} />
          <UserForm
            userData={userData}
            onSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
