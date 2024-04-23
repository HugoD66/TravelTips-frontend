import React, {FormEvent, useState} from "react";
import {loginUser} from "../../services/userService";
import '../../styles/form.css';
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({
  goChangeForm,
  handleLogin,
}: {
  goChangeForm: () => void;
  handleLogin: (status: boolean) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(new Error("Veuillez saisir une adresse e-mail valide"));
      return;
    }

    if (password.length < 8) {
      setError(
        new Error("Le mot de passe doit contenir au moins 8 caractères")
      );
      return;
    }
    loginUser(email, password)
      .then((response) => {
        console.log("Utilisateur connecté avec succès :", response);
        setEmail("");
        setPassword("");
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("id", response.id);
        localStorage.setItem("role", response.role);
        handleLogin(true);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error.message);
        setError(new Error(error.message));
      });
  };

  return (
    <div className="container-form">
      <h2>Formulaire de connexion</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">
          E-mail :
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Mot de passe :
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      <p onClick={() => goChangeForm()}>Vous n'avez pas de compte ? </p>
      <>{error && <p className="error-message">{error.message}</p>}</>
    </div>
  );
};
export default Login;
