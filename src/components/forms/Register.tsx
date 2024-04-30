import React, {FormEvent, useState} from "react";
import { registerUser} from "../../services/userService";
import '../../styles/form.css';

const Register = ({ goChangeForm }: { goChangeForm: () => void }) => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[a-zA-Z]{3,}$/.test(firstname)) {
      setError(
        new Error(
          "Le prénom doit contenir au moins 3 lettres et ne pas contenir de chiffres"
        )
      );
      return;
    }

    if (!/^[a-zA-Z]{3,}$/.test(lastname)) {
      setError(
        new Error(
          "Le nom doit contenir au moins 3 lettres et ne pas contenir de chiffres"
        )
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      setError(new Error("Veuillez saisir une adresse e-mail valide"));
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        new Error(
          "Le mot de passe doit contenir au moins 8 caractères, 1 caractère spécial, 1 chiffre, 1 minuscule et 1 majuscule"
        )
      );
      return;
    }

    registerUser(firstname, lastname, birthday, mail, password)
      .then((response) => {
        setMail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setBirthday("");
        goChangeForm();
      })

      .catch((error) => {
        console.error("Erreur lors de l'enregistrement : ", error);
        setError(new Error("Erreur lors de l'enregistrement : ", error));
      });
  };

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
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label htmlFor="lastname">
            Nom :
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            E-mail :
            <input
              id="mail"
              type="text"
              name="mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </label>
          <label htmlFor="birthday">
            Date de naissance :
            <input
              id="birthday"
              type="date"
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="birthday-input"
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
        <p onClick={() => goChangeForm()}>Déjà inscrit ? </p>
        <>{error && <span className="error-message">{error.message}</span>}</>
      </>
    </div>
  );
};

export default Register;
