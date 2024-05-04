import React, {useEffect, useState} from "react";
import { getDayInItineraryList } from "../services/dayItineraryService";
import {ItineraryModel} from "../models/ItineraryModel";
import {getItineraryList} from "../services/itineraryService";
import {DayItineraryModel} from "../models/DayItineraryModel";
import '../styles/itineratiesScreen.css';
import {Link} from "react-router-dom";
import Map, {TipLocation} from "../components/Map";
const ItineraryPage = () => {
  const [itineraryList, setItineraryList] = useState<ItineraryModel[]>([]);
  const [dayItineraryList, setDayItineraryList] = useState<DayItineraryModel[]>([]);
  const [itineraryMarkers, setItineraryMarkers] = useState<{ [itineraryId: string]: TipLocation[] }>({});

  useEffect(() => {
    fetchItinerariesList().then(() => {
      fetchDayInItineraryList();
    })
  }, []);


  const fetchItinerariesList = async () => {
    try {
      const response = await getItineraryList();
      console.log('Itineraries');
      console.log(response);
      setItineraryList(response);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchDayInItineraryList = async () => {
    try {
      const response = await getDayInItineraryList();
      setDayItineraryList(response);

      const markers: { [itineraryId: string]: TipLocation[] } = {};
      response.forEach((dayItinerary: any) => {
        const { idItinerary, idTips } = dayItinerary;
        if (idItinerary && idTips) {
          const itineraryId = typeof idItinerary === "string" ? idItinerary : idItinerary.id;
          const tipLocation: TipLocation = {
            lat: idTips.lat,
            lng: idTips.lng,
            tipSelected: idTips
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
    <div className="itineraries-carousel">
      {itineraryList.map((itinerary) => {
        let initialPosition = {lat: 8, lng: -55};
        if (itineraryMarkers[itinerary.id!] && itineraryMarkers[itinerary.id!].length > 0) {
          const firstMarker = itineraryMarkers[itinerary.id!][0];
          initialPosition = {lat: parseFloat(firstMarker.lat), lng: parseFloat(firstMarker.lng)};
        }
        return (
          <div className="card-itinerary" key={itinerary.id}>
            <div className="itineraries-card-content">
              <h2 className="itineraries-card-title">{itinerary.name}</h2>
              <p>Jour de départ {new Date(itinerary.dayOne!).toLocaleDateString()}</p>
              <Link to={`/itineraries/${itinerary.id}`} className="card">
                <button className="itineraries-card-button-explore">Explorer</button>
              </Link>
              <div className="itineraries-card-footer">
                <p><i>{itinerary.numberDay} jours</i></p>
                <p className="category">
                  {typeof itinerary.idCategory === "object"
                    ? itinerary.idCategory.name
                    : ""}
                </p>
              </div>
              <p className="created-at-initerarie">{new Date(itinerary.createdAt!).toLocaleDateString()}</p>
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
      })}
    </div>
  )
};

export default ItineraryPage;

