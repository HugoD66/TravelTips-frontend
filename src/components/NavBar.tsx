import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import UserMenu from "./user/general/UserMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./admin/general/AdminMenu";

const NavBar = ({
  handleLogin,
  isLoggedIn,
}: {
  handleLogin: (status: boolean) => void;
  isLoggedIn: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>(
    localStorage.getItem("role") || ""
  );
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const navigation = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    setUserRole(localStorage.getItem("role") || "");
    if (token !== "" || userRole !== "") {
      handleLogin(true);
    } else {
      handleLogin(false);
    }
  }, [token, userRole, handleLogin]);

  const deco = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("role");
    handleLogin(false);
    toast.success("Déconnexion réussie", {
      position: "top-center",
      autoClose: 3000,
    });
    navigation("/home");
  };

  const generationFixtures= () => {
    return fetch(`http://localhost:4000/fixtures/mockups`, {
      method: "POST",
    }).then((response) => {
      if (!response.ok) {
        //throw new Error("Réponse réseau non OK");
        return
      }
      return response.json();
    });
  }
  return (
    <nav className="navbar">
      <button className="fixture-generation" onClick={() => generationFixtures()}>Generation fixtures</button>
      <div className="nav-logo">
        <Link to="/">
          <img src="/images/logoSide.png" alt="Logo"/>
        </Link>
      </div>
      <button className="burger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/home">Accueil</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/itinerary">Mon itinéraire</Link>
        {isLoggedIn ? (
          <>
            {userRole === "Admin" && <AdminMenu deco={deco}/>}
            {userRole === "User" && <UserMenu deco={deco}/>}
          </>
        ) : (
          <div className="nav-profile">
            <Link to="/profile">Se connecter</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
