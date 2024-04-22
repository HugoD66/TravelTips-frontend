import { User } from "../../../models/UserData";

interface UserTableProps {
  users: User[];
  deleteUser: (id: string) => void;
  editUser: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  deleteUser,
  editUser,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom de famille</th>
          <th>Email</th>
          <th>Date de naissance</th>
          <th>Rôle</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.mail}</td>
            <td>{user.birthday.toString()}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
              <button onClick={() => editUser(user.id)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UserTable;
