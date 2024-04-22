import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../../models/UserData";
import { updateMe } from "../../../services/userService";

interface EditUserFormProps {
  user: User;
  updateUser: (id: String, updatedUser: Partial<User>) => void;
}
const EditUserForm: React.FC<EditUserFormProps> = ({ user, updateUser }) => {
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>(user);
  const [token, setToken] = useState(localStorage.getItem("token" || ""));

  useEffect(() => {
    // Met à jour l'état local lorsque l'utilisateur prop change
    setUpdatedUser({ ...user });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      updatedUser.id !== undefined &&
      token !== null &&
      updatedUser.firstName &&
      updatedUser.lastName &&
      updatedUser.birthday &&
      updatedUser.mail &&
      updatedUser.password &&
      updatedUser.role
    ) {
      updateMe(
        updatedUser.id,
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.birthday,
        updatedUser.mail,
        updatedUser.password,
        token
      )
        .then((response) => {
          updateUser(user.id, updatedUser);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={updatedUser.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={updatedUser.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="mail"
        placeholder="Email"
        value={updatedUser.mail}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={updatedUser.password}
        onChange={handleChange}
      />
      <input
        type="date"
        name="birthday"
        placeholder="Birthday"
        value={updatedUser.birthday}
        onChange={handleChange}
      />
      <select name="role" value={updatedUser.role} onChange={handleChange}>
        <option value="User">Utilisateur</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Update</button>
    </form>
  );
};
export default EditUserForm;
