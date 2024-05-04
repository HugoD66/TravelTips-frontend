import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../../models/UserData";
import { registerUserAdmin } from "../../../services/userService";
import '../../../styles/admin.css';

const AddUserForm: React.FC<{ onUserAdded: (user: User) => void }> = ({
  onUserAdded,
}) => {
  const [user, setUser] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
    birthday: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !user.firstName ||
      !user.lastName ||
      !user.mail ||
      !user.password ||
      !user.birthday ||
      !user.role
    )
      return;

    registerUserAdmin(
      user.firstName,
      user.lastName,
      user.birthday,
      user.mail,
      user.password,
      user.role
    )
      .then((response) => {
        onUserAdded(response);
      })

      .catch((error) => {
        console.error("Erreur lors de l'enregistrement : ", error);
      });
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <form className="admin-users-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="mail"
        placeholder="Email"
        value={user.mail}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <input
        type="date"
        name="birthday"
        placeholder="Birthday"
        value={user.birthday}
        onChange={handleChange}
      />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="">Choisissez un rôle</option>
        <option value="User">Utilisateur</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};
export default AddUserForm;
