import React, { useEffect, useState} from 'react';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';

const ProfilePage = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    /*
        Condition setIsLogged ici
     */
  }, []);

  const goChangeForm = () =>  {
    setIsRegistered(!isRegistered);
  }
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div>
      <h1>Coucou</h1>
      {isLogged ? (
        <p>Vous êtes connecté.</p>
      ) : (
        <>
        {isRegistered ? (
          <Login goChangeForm={goChangeForm} handleError={handleError}/>

        ) : (
        <Register goChangeForm={goChangeForm} handleError={handleError}/>
        )}
        </>
      )}
      {error && <p className="error-message">{error}</p>}

    </div>
  );
};

export default ProfilePage;
