import React, {FormEvent, useState} from "react";
import { registerUser} from "../../services/userService";
import '../../styles/form.css';

const Register = ({ goChangeForm, handleError }: { goChangeForm: () => void; handleError: (errorMessage: string) => void }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");


  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Tentative de connexion avec : ", {email, password, firstname, lastname, birthday});
    registerUser({email, password, firstname, lastname, birthday}).then((response) => {
      console.log("Utilisateur enregistré avec succès :", response);
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setBirthday("");
      goChangeForm();
    })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement :", error);
        handleError("Un problème est survenu lors de l'enregistrement. Veuillez réessayer.");
      });
  }

  return (
    <div className="container-form">
      <>
        <h2>Formulaire d'enregistrement</h2>
        <form onSubmit={handleRegisterSubmit}>
          <label htmlFor="firstname">
            Prénom :
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}/>
          </label>
          <label htmlFor="lastname">
            Nom :
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}/>
          </label>
          <label htmlFor="email">
            E-mail :
            <input
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label htmlFor="birthday">
            Date de naissance :
            <input
              id="birthday"
              type="date"
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}/>
          </label>
          <label htmlFor="password">
            Mot de passe :
            <input
              id="password"
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <input type="submit" value="Envoyer"/>
        </form>
        <p onClick={() => goChangeForm()}>Déjà inscrit ? </p></>
    </div>
  )
}

export default Register;
