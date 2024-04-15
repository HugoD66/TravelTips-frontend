import React, { useEffect, useState } from "react";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";

const ProfilePage = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [localStorage.getItem("token")]);

  const goChangeForm = () => {
    setIsRegistered(!isRegistered);
  };
  const setIsLoggedTrue = () => {
    setIsLogged(true);
  };
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };
  const deco = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <div>
      <h1>Coucou</h1>
      {isLogged ? (
        <>
          <p>Vous êtes connecté.</p>
          <button onClick={deco}>Déconnnexion</button>
        </>
      ) : (
        <>
          {isRegistered ? (
            <Login goChangeForm={goChangeForm} handleError={handleError} />
          ) : (
            <Register goChangeForm={goChangeForm} handleError={handleError} />
          )}
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfilePage;
