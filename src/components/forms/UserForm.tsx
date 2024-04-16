const UserForm = ({
  userData,
  onSubmit,
  handleChange,
}: {
  userData: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="user-form">
      <h2>Modifier mes informations</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="date"
          name="birthday"
          value={userData.birthday}
          onChange={handleChange}
          placeholder="Date de naissance"
          required
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};
export default UserForm;
