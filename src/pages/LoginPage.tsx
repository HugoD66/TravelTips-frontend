import React, { useEffect, useState } from 'react';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';
import '../styles/loginpage.css';

const globeProps = {
    globeImageUrl: "//unpkg.com/three-globe/example/img/earth-day.jpg",
    bumpImageUrl: "//unpkg.com/three-globe/example/img/earth-topology.png",
    backgroundColor: "rgba(0, 0, 0, 0)",
    animateIn: true,
    onGlobeReady: () => console.log("Globe ready"),
  };

const LoginPage = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isRegistered, setIsRegistered] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const goChangeForm = () => {
        setIsRegistered(!isRegistered);
    }

    const setIsLoggedTrue = () => {
        setIsLogged(true);
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
    };

    const handleDirectAccess = () => {
        navigate('/home');
    };

    return (
        <div className="login-page">
            <div className="globe-container">
                <Globe {...globeProps} />
            </div>
            <div className="form-container">
                {isLogged ? (
                    <p>Vous êtes connecté.</p>
                ) : (
                    <>
                        {isRegistered ? (
                            <Login goChangeForm={goChangeForm} handleError={handleError} setIsLoggedTrue={setIsLoggedTrue} />
                        ) : (
                            <Register goChangeForm={goChangeForm} handleError={handleError} />
                        )}
                        {error && <p className="error-message">{error}</p>}
                    </>
                )}
                <button onClick={handleDirectAccess} className="direct-access-button">
                    Accéder directement au site 
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
