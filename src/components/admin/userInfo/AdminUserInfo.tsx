import { useEffect, useState } from "react";
import { User } from "../../../models/UserData";
import EditUserForm from "./AdminEditUserform";
import UserTable from "./AdminUserTable";
import AddUserForm from "./AdminAddUserform";
import { getUserList, removeUser } from "../../../services/userService";
import '../../../styles/admin.css';

const AdminUserInfo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    if (token) {
      getUserList(token)
        .then((response) => {
          setUsers(response);
        })
        .catch((error) => {});
    }
  }, [token]);

  const handleAddUser = () => {
    setAddUser(true);
    setEditUser(null);
  };
  const handleUserAdded = (newUser: User) => {
    setUsers([...users, newUser]);
    setAddUser(false);
  };

  const deleteUser = async (id: string) => {
    const confirmDelete = window.confirm(
      `Etes-vous sûr de vouloir supprimer l'utilisateur ${id} et toutes ses données ?`
    );
    if (confirmDelete) {
      if (token) {
        removeUser(id, token)
          .then((response) => {
            console.log(JSON.stringify(response));
            setUsers(users.filter((user) => user.id !== id));
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    }
  };

  const updateUser = (id: String, updatedUser: Partial<User>) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
    setEditUser(null);
  };

  const handleEdit = (id: string) => {
    setAddUser(false);
    setEditUser(id);
  };
  return (
    <div className="admin-users-info" >
      <h2>Liste des utilisateurs</h2>
      <UserTable users={users} deleteUser={deleteUser} editUser={handleEdit} />
      {editUser !== null ? (
        <EditUserForm
          user={users.find((user) => user.id === editUser)!}
          updateUser={updateUser}
        />
      ) : null}
      {addUser === false ? (
        <button onClick={handleAddUser}>Ajouter un utilisateur</button>
      ) : (
        <AddUserForm onUserAdded={handleUserAdded} />
      )}
    </div>
  );
};

export default AdminUserInfo;
