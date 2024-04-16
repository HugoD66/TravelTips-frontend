import React, { FormEvent, useState } from "react";
import { loginUser } from "../../services/userService";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({
  goChangeForm,
  handleError,
}: {
  goChangeForm: () => void;
  handleError: (errorMessage: string) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(email, password)
      .then((response) => {
        console.log("Utilisateur connecté avec succès :", response);
        setEmail("");
        setPassword("");
        localStorage.setItem("token", response.access_token);
        console.log("token " + response.access_token);
        console.log("id" + response.id);
        localStorage.setItem("id", response.id);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        handleError(
          "Un problème est survenu lors de la connexion. Veuillez réessayer."
        );
      });
  };

  return (
    <div className="login-form">
      <h2>Formulaire de connexion</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">
          Adresse mail :
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
    </div>
  );
};
export default Login;
