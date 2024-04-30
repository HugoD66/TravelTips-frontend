import { useEffect, useState } from "react";
import { getTipsUser } from "../../../services/tipService";
import { TipModel } from "../../../models/TipModel";
import UserTipsTable from "./UserTipsTable";
import ModifiableRejectedTipsTable from "./ModifyRejectedTipsTable";
import '../../../styles/user.css';

const UserTips: React.FC = () => {
  const [tips, setTips] = useState<TipModel[]>([]);
  const token: string | null = localStorage.getItem("token");
  const userId: string | null = localStorage.getItem("id");

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      if (token && userId) {
        const userTips = await getTipsUser(userId, token);
        setTips(userTips);
      }
    } catch (error) {
      console.error("Error fetching user tips:", error);
    }
  };

  return (
    <div>
      <UserTipsTable
        tips={tips.filter((tip) => tip.approvate === "pending")}
        title={"Mes tips en attente de validation"}
      />
      <UserTipsTable
        tips={tips.filter((tip) => tip.approvate === "true")}
        title={"Mes tips en ligne"}
      />
      <ModifiableRejectedTipsTable
        tips={tips.filter(
          (tip) => tip.approvate === "false" && tip.nbApprobation > 0
        )}
      />
      <UserTipsTable
        tips={tips.filter(
          (tip) => tip.approvate === "false" && tip.nbApprobation === 0
        )}
        title={"Mes tips rejetés non modifiables"}
      />
    </div>
  );
};

export default UserTips;
