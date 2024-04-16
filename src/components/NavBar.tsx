import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import UserMenu from "./UserMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./AdminMenu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [userRole, setUserRole] = useState<string>(
    localStorage.getItem("role") || ""
  );
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    if (token !== "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const deco = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    toast.success("Déconnexion réussie", {
      position: "top-center",
      autoClose: 3000,
    });
  };
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src="/images/logoSide.png" alt="Logo" />
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
          userRole === "Admin" ? (
            <AdminMenu deco={deco} />
          ) : (
            userRole === "User" && <UserMenu deco={deco} />
          )
        ) : (
          <div className="nav-profile">
            <Link to="/profile">Profile</Link>
            <Link to="/profile">
              <img src="/images/traveller.png" alt="Profile" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
