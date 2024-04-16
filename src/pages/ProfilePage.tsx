import React, { useEffect, useState} from 'react';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import UserMenu from "../components/UserMenu";
import { useLocation } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import UserForm from "../components/forms/UserForm";
import UserTips from "../components/UserTips";
import { getMe, updateMe } from "../services/userService";
// import {getTipList} from "../services/tip";
// import {getUserList} from "../services/userService";
// import {getCountryList} from "../services/country";
// import {getCategoryList} from "../services/category";
// import {getCityList} from "../services/city";
// import {getDayInItineraryList} from "../services/dayInierary";
// import {getItineraryList} from "../services/itinerary";

const ProfilePage = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("id");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [selectedComponent, setSelectedComponent] = useState<string>(
    params.get("parametre") || ""
  );
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
  });

  //TODO Temporaire
  // useEffect(() => {
  //   getTipList().then((data) => console.log(data));
  //   getUserList().then((data) => console.log(data));
  //   getCountryList().then((data) => console.log(data));
  //   getCategoryList().then((data) => console.log(data));
  //   getCityList().then((data) => console.log(data));
  //   getDayInItineraryList().then((data) => console.log(data));
  //   getItineraryList().then((data) => console.log(data));
  // }, []);

  useEffect(() => {
    setSelectedComponent(params.get("parametre") || "");
    if (token !== null && idUser !== null) {
      setIsLogged(true);
      getMe(token, idUser).then((response) => {
        setUserData(response);
      });
    } else {
      setIsLogged(false);
    }
  }, [token, idUser, params]);

  const goChangeForm = () => {
    setIsRegistered(!isRegistered);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
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
    <div>
      {isLogged ? (
        <div>
          {selectedComponent === "userInfo" && (
            <div className="user-info-container">
              <UserInfo userData={userData} />
              <UserForm
                userData={userData}
                onSubmit={handleSubmit}
                handleChange={handleChange}
              />
            </div>
          )}
          {selectedComponent === "userTips" && (
            <div className="user-info-container">
              <UserTips></UserTips>
            </div>
          )}
        </div>
      ) : (
        <>
          {isRegistered ? (
            <Login goChangeForm={goChangeForm} handleError={handleError} />
          ) : (
            <Register goChangeForm={goChangeForm} handleError={handleError} />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
