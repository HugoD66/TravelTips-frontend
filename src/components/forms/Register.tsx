import React, { FormEvent, useState } from "react";
import { registerUser } from "../../services/userService";

const Register = ({ goChangeForm }: { goChangeForm: () => void }) => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Tentative de connexion avec : ", {
      mail,
      password,
      firstname,
      lastname,
      birthday,
    });
    // Validation du prénom
    if (!/^[a-zA-Z]{3,}$/.test(firstname)) {
      setError(
        new Error(
          "Le prénom doit contenir au moins 3 lettres et ne pas contenir de chiffres"
        )
      );
      return;
    }

    // Validation du nom
    if (!/^[a-zA-Z]{3,}$/.test(lastname)) {
      setError(
        new Error(
          "Le nom doit contenir au moins 3 lettres et ne pas contenir de chiffres"
        )
      );
      return;
    }

    // Validation de la date de naissance
    const birthdateRegex =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19[2-9]\d|200[0-9]|201[0-5])$/;
    if (!birthdateRegex.test(birthday)) {
      setError(
        new Error(
          "La date de naissance doit être au format jj/mm/aaaa et comprise entre 1920 et 2015"
        )
      );
      return;
    }

    // Validation de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      setError(new Error("Veuillez saisir une adresse e-mail valide"));
      return;
    }

    // Validation du mot de passe
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
        console.log("Utilisateur enregistré avec succès :", response);
        setMail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setBirthday("");
        goChangeForm();
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement :", error);
        setError(new Error("Erreur lors de l'enregistrement :", error));
      });
  };

  return (
    <div className="register-form">
      <>
        <h2>Formulaire d'enregistrement</h2>
        <form onSubmit={handleRegisterSubmit}>
          <label htmlFor="firstname">
            Nom :
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label htmlFor="lastname">
            Prénom :
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label htmlFor="mail">
            Adresse mail :
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
        <p onClick={() => goChangeForm()}>Déjà enregistré? </p>
        <>{error && <p className="error-message">{error.message}</p>}</>
      </>
    </div>
  );
};

export default Register;
