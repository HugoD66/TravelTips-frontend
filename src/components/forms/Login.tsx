import React, {FormEvent, useState} from "react";
import {loginUser} from "../../services/userService";
import '../../styles/form.css';


const Login = ({ goChangeForm, handleError, setIsLoggedTrue }: { goChangeForm: () => void; handleError: (errorMessage: string) => void; setIsLoggedTrue: () => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser({email, password}).then((response) => {
      console.log("Utilisateur connecté avec succès :", response);
      setEmail("");
      setPassword("");
      setIsLoggedTrue();
    })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        handleError("Un problème est survenu lors de la connexion. Veuillez réessayer.");
      });
  }

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
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <input type="submit" value="Envoyer"/>
      </form>
      <p onClick={() => goChangeForm()}>Pas encore inscrit ? </p>
</div>
)
}
export default Login;
