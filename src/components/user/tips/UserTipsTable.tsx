import { TipModel } from "../../../models/TipModel";

const UserTipsTable: React.FC<{ tips: TipModel[]; title: string }> = ({
  tips,
  title,
}) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Code Postale</th>
            <th>Pays</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip) => (
            <tr key={tip.id}>
              <td>{tip.name}</td>
              <td>{tip.address}</td>
              <td>{typeof tip.idCity === "object" ? tip.idCity.name : ""}</td>
              <td>
                {typeof tip.idCity === "object" ? tip.idCity.zipCode : ""}
              </td>
              <td>
                {tip.idCity &&
                  typeof tip.idCity === "object" &&
                  tip.idCity.idCountry &&
                  typeof tip.idCity.idCountry === "object" &&
                  tip.idCity.idCountry.name}
              </td>
              <td>{tip.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserTipsTable;
