import React, { useEffect, useState } from "react";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import { useLocation } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import UserForm from "../components/forms/UserForm";
import UserTips from "../components/UserTips";
import { getMe, updateMe } from "../services/userService";

const ProfilePage = ({
  handleLogin,
}: {
  handleLogin: (status: boolean) => void;
}) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
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
            <Login goChangeForm={goChangeForm} handleLogin={handleLogin} />
          ) : (
            <Register goChangeForm={goChangeForm} />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
