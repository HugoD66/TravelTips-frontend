import { useEffect, useState } from "react";
import {getItineraryUser} from "../../../services/itineraryService";
import {ItineraryModel} from "../../../models/ItineraryModel";
import UserItineraryTable from "./UserItineraryTable";
import ModifyRejectedItineraryTable from "./ModifyRejectedItineraryTable";

const UserItinerary: React.FC = () => {
  const [itineraries, setItineraries] = useState<ItineraryModel[]>([]);
  const token: string | null = localStorage.getItem("token");
  const userId: string | null = localStorage.getItem("id");

  useEffect(() => {
    fetchItinerary();
  }, []);

  const fetchItinerary = async () => {
    try {
      if (token && userId) {
        const userItineraries = await getItineraryUser(userId, token);
        setItineraries(userItineraries);
        console.log(itineraries)
      }
    } catch (error) {
      console.error("Error fetching user itinerary:", error);
    }
  }

  return (
      <div>
          <UserItineraryTable
            itineraries={itineraries.filter((itinerary) => itinerary.approvate === "pending")}
            title={"Mes itinéraires en attente de validation"}
          />
        <UserItineraryTable
          itineraries={itineraries.filter((itinerary) => itinerary.approvate === "true")}
          title={"Mes itinéraires validés"}
        />
        <ModifyRejectedItineraryTable
          itineraries={itineraries.filter((itinerary) => itinerary.approvate === "false" && itinerary.nbApprobation > 0)}
          title={"Mes tips rejetés modifiables"}/>
        <UserItineraryTable
          itineraries={itineraries.filter((itinerary) => itinerary.approvate === "true")}
          title={"Mes itinéraires rejetés non modifiables"}
        />
      </div>
  );
}
export default UserItinerary;