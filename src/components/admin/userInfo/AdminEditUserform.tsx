import { useState } from "react";
import { User } from "../../../models/UserData";
import { updateMe } from "../../../services/userService";

interface EditUserFormProps {
  user: User;
  updateUser: (id: String, updatedUser: Partial<User>) => void;
}
const EditUserForm: React.FC<EditUserFormProps> = ({ user, updateUser }) => {
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>(user);
  const [token, setToken] = useState(localStorage.getItem("token" || ""));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.id !== null && token !== null) {
      updateMe(
        user.id,
        user.firstName,
        user.lastName,
        user.birthday,
        user.mail,
        user.password,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
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
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={updatedUser.role}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};
export default EditUserForm;
