import { useState } from "react";
import { User } from "../../../models/UserData";
import { registerUser } from "../../../services/userService";

const AddUserForm: React.FC<{ addUser: (newUser: Partial<User>) => void }> = ({
  addUser,
}) => {
  const [user, setUser] = useState<Partial<User>>({
    id: "",
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

    registerUser(
      user.firstName,
      user.lastName,
      user.birthday,
      user.mail,
      user.password
    )
      .then((response) => {
        console.log("Utilisateur enregistré avec succès :", response);
      })

      .catch((error) => {
        console.error("Erreur lors de l'enregistrement : ", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={user.role}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};
export default AddUserForm;
