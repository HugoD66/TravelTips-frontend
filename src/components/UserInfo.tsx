const UserInfo = ({ userData }: { userData: any }) => {
  return (
    <div className="user-info">
      <h2>Mes informations</h2>
      <p>Prénom: {userData.firstName}</p>
      <p>Nom: {userData.lastName}</p>
      <p>Email: {userData.mail}</p>
      <p>Date de naissance: {userData.birthday}</p>
    </div>
  );
};
export default UserInfo;
