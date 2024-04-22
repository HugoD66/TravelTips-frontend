import React, { useEffect, useState} from 'react';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import {getTipList} from "../services/tip";
import {getUserList} from "../services/userService";
import {getCountryList} from "../services/country";
import {getCategoryList} from "../services/category";
import {getCityList} from "../services/city";
import {getDayInItineraryList} from "../services/dayInierary";
import {getItineraryList} from "../services/itinerary";

const ProfilePage = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  //TODO Temporaire
  useEffect(() => {
    getTipList().then((data) => console.log(data));
    getUserList().then((data) => console.log(data));
    getCountryList().then((data) => console.log(data));
    getCategoryList().then((data) => console.log(data));
    getCityList().then((data) => console.log(data));
    getDayInItineraryList().then((data) => console.log(data));
    getItineraryList().then((data) => console.log(data));
  }, []);

  useEffect(() => {
    /*
        Condition setIsLogged ici
     */
  }, []);

  const goChangeForm = () =>  {
    setIsRegistered(!isRegistered);
  }
  const setIsLoggedTrue = () => {
    setIsLogged(true);
  };
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
          <Login goChangeForm={goChangeForm} handleError={handleError} setIsLoggedTrue={setIsLoggedTrue}/>
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
