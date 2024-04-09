import React, {FormEvent, useState} from "react";

const Login = ({ goChangeForm, handleError }: { goChangeForm: () => void; handleError: (errorMessage: string) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Tentative de connexion avec : ", { email, password });

    //Si erreur lors de l'envoi :
    handleError("Message d'erreur de connexion");


  }

  return (
    <div className="login-form">
      <h2>Formulaire de connexion</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">
          Nom :
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Nom :
          <input
            id="password"
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <input type="submit" value="Envoyer"/>
      </form>
      <p onClick={() => goChangeForm()}>Déjà enregistré ? </p>
</div>
)
}
export default Login;
