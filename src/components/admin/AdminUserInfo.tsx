import { useEffect, useState } from "react";
import { User } from "../../models/UserData";
import EditUserForm from "./userInfo/AdminEditUserform";
import UserTable from "./userInfo/AdminUserTable";
import AddUserForm from "./userInfo/AdminAddUserform";
import { getUserList, removeUser } from "../../services/userService";

const AdminUserInfo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token" || ""));

  useEffect(() => {
    if (token) {
      getUserList(token)
        .then((response) => {
          console.log(JSON.stringify(response));
          setUsers(response);
        })
        .catch((error) => {});
    }
  }, []);

  const addUser = (newUser: Partial<User>) => {
    setUsers([...users, newUser as User]);
  };

  const deleteUser = async (id: string) => {
    const confirmDelete = window.confirm(
      `Etes-vous sûr de vouloir supprimer l'utilisateur ${id}?`
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

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <UserTable
        users={users}
        deleteUser={deleteUser}
        editUser={(id: string) => setEditUser(id)}
      />
      {editUser !== null ? (
        <EditUserForm
          user={users.find((user) => user.id === editUser)!}
          updateUser={updateUser}
        />
      ) : (
        <AddUserForm addUser={addUser} />
      )}
    </div>
  );
};

export default AdminUserInfo;
