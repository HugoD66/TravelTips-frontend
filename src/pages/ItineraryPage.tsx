import React, { useEffect, useState } from "react";
import { getDayInItineraryList } from "../services/dayItineraryService";
import { ItineraryModel } from "../models/ItineraryModel";
import { getItineraryList } from "../services/itineraryService";
import { DayItineraryModel } from "../models/DayItineraryModel";
import "../styles/itineratiesScreen.css";
import { Link, useNavigate } from "react-router-dom";
import Map, { TipLocation } from "../components/Map";
const ItineraryPage = () => {
  const [itineraryList, setItineraryList] = useState<ItineraryModel[]>([]);
  const [pendingItineraryCount, setPendingItineraryCount] = useState<number>(0);
  const [itineraryListApproved, setItineraryListApproved] = useState<
    ItineraryModel[]
  >([]);
  const [dayItineraryList, setDayItineraryList] = useState<DayItineraryModel[]>(
    []
  );
  const [itineraryMarkers, setItineraryMarkers] = useState<{
    [itineraryId: string]: TipLocation[];
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchItinerariesList().then(() => {
      fetchDayInItineraryList();
    });
  }, []);

  const fetchItinerariesList = async () => {
    try {
      const response = await getItineraryList();
      setItineraryList(response);

      const approvedItineraries = response.filter(
        (itinerary: ItineraryModel) => itinerary.approvate === "true"
      );
      setItineraryListApproved(approvedItineraries);

      const pendingItineraries = response.filter(
        (itinerary: ItineraryModel) => itinerary.approvate === "pending"
      );
      setPendingItineraryCount(pendingItineraries.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDayInItineraryList = async () => {
    try {
      const response = await getDayInItineraryList();
      setDayItineraryList(response);

      const markers: { [itineraryId: string]: TipLocation[] } = {};
      response.forEach((dayItinerary: any) => {
        const { idItinerary, idTips } = dayItinerary;
        if (idItinerary && idTips) {
          const itineraryId =
            typeof idItinerary === "string" ? idItinerary : idItinerary.id;
          const tipLocation: TipLocation = {
            lat: idTips.lat,
            lng: idTips.lng,
            tipSelected: idTips,
          };
          if (markers[itineraryId]) {
            markers[itineraryId].push(tipLocation);
          } else {
            markers[itineraryId] = [tipLocation];
          }
        }
      });
      setItineraryMarkers(markers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="title-add-itinerarie">
        <h1>Tous nos itinéraires ! </h1>
        <button
          onClick={() => navigate("/add-itinerary")}
          className="add-itinerary-button-destination"
        >
          Ajouter un Itinéraire
        </button>
      </div>
      <h3 className="pending-tips-count">
        Itinéraire en attente d'approbation : {pendingItineraryCount}
      </h3>
      <div className="itineraries-carousel">
        {itineraryListApproved.length === 0 ? (
          <p className="itineraryList-empty">
            Il semble que vous n'ayez pas encore créé d'itinéraire. Pourquoi ne
            pas commencer dès maintenant à planifier votre prochaine aventure ?
          </p>
        ) : (
          itineraryListApproved.map((itinerary) => {
            let initialPosition = { lat: 8, lng: -55 };
            if (
              itineraryMarkers[itinerary.id!] &&
              itineraryMarkers[itinerary.id!].length > 0
            ) {
              const firstMarker = itineraryMarkers[itinerary.id!][0];
              initialPosition = {
                lat: parseFloat(firstMarker.lat),
                lng: parseFloat(firstMarker.lng),
              };
            }
            return (
              <div className="card-itinerary" key={itinerary.id}>
                <div className="itineraries-card-content">
                  <h2 className="itineraries-card-title">{itinerary.name}</h2>
                  <p>
                    Jour de départ{" "}
                    {new Date(itinerary.dayOne!).toLocaleDateString()}
                  </p>
                  <Link to={`/itineraries/${itinerary.id}`} className="card">
                    <button className="itineraries-card-button-explore">
                      Explorer
                    </button>
                  </Link>
                  <div className="itineraries-card-footer">
                    <p>
                      <i>{itinerary.numberDay} jours</i>
                    </p>
                    <p className="category">
                      {typeof itinerary.idCategory === "object"
                        ? itinerary.idCategory.name
                        : ""}
                    </p>
                  </div>
                  <p className="created-at-initerarie">
                    {new Date(itinerary.createdAt!).toLocaleDateString()}
                  </p>
                </div>
                <Map
                  isInteractive={false}
                  isOnItinaryPanel={true}
                  initialPosition={initialPosition}
                  markers={itineraryMarkers[itinerary.id!] || []}
                  zoom={2}
                />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default ItineraryPage;
