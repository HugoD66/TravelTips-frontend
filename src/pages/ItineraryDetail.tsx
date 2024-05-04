import {Link, useParams} from "react-router-dom";
import {ItineraryModel} from "../models/ItineraryModel";
import React, {useCallback, useEffect, useState} from "react";
import {getItineraryById} from "../services/itineraryService";
import Map, {TipLocation} from "../components/Map";
import {TipModel} from "../models/TipModel";
import {getPictures} from "../services/pictureService";
import {PictureModel} from "../models/PictureModel";
import {useTip} from "../context/TipProvider";
import ProgressBar from "../components/ProgressBar";
import {findAllByItineraryId} from "../services/dayItineraryService";
import {DayItineraryModel} from "../models/DayItineraryModel";
import defaultPicture from "../styles/pictures/defaultTipsPIcture.jpg";

const ItineraryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { tipDetail, setTipDetail } = useTip();
  const [itinerary, setItinerary] = useState<ItineraryModel>();
  const token = localStorage.getItem('token');
  const [listTip, setTipList] = useState<TipModel[]>([]);
  const [pictureList, setPictureList] = useState<PictureModel[]>([]);
  const [geoTips, setGeoTips] = useState<TipLocation[]>([]);

  useEffect(() => {
    setTipDetail({} as TipModel)
    fetchItinerary();
  }, []);

  const fetchItinerary = async () => {
    try {
      if (!token || !id) {
        return;
      }
      const response = await getItineraryById(id, token);
      setItinerary(response);
      const responseDayItinerary = await findAllByItineraryId(response.id);
      const tips = responseDayItinerary.map((dayItinerary: DayItineraryModel) => dayItinerary.idTips);
      setTipList(tips);
      console.log(tips)
      const allPicturePromises = tips.map(async (tip: TipModel) => {
        const pictureResponses = await getPictures(tip.id!);
        return pictureResponses.map((picture: PictureModel) => ({
          ...picture,
          tipId: tip.id
        }));
      });

      const allGeoTips = tips.map((tip: TipLocation) => ({
        lat: tip.lat,
        lng: tip.lng,
        tipSelected: tip
      }));
      setGeoTips(allGeoTips);

      const picturesArrays = await Promise.all(allPicturePromises);
      const allPictures = picturesArrays.flat();
      setPictureList(allPictures);
      console.log(allPictures)

    } catch (error) {
      console.error('Erreur lors de la récupération de l\'itinéraire:', error);
    }
  };

  let initialPosition = { lat: 47, lng: -2 };
  if (geoTips.length > 0) {
    const sumPos = geoTips.reduce((acc, curr: TipLocation) => ({
      lat: acc.lat + parseFloat(curr.lat),
      lng: acc.lng + parseFloat(curr.lng)
    }), { lat: 0, lng: 0 });
    initialPosition = {
      lat: sumPos.lat / geoTips.length,
      lng: sumPos.lng / geoTips.length
    };
  }

  const handleTipSelect = useCallback((tip: TipModel) => {
    setTipDetail(tip);
  }, [setTipDetail]);

  return (
    <>
      <h1>Détails de l'itineraire</h1>
      <div className="content-detail">
        <div className="content-click-detail">
          <div className="content-detail-itinaries">
            <h2>{itinerary?.name}</h2>
            <div className="dayz-information">

              {itinerary?.public ? <p className="public-itinary">Itinéraire Public</p> :
                <p className="private-itinary">Itinéraire Privé</p>}
            </div>
            <div className="dayz-country">
              <div className="start-end-day">
                <p> Départ le : {itinerary?.dayOne}</p>
                <p> Arrivé le : {itinerary?.lastDay}</p>
              </div>
              <div className="count-tips">
                <p>Nombre de Tips : {listTip.length}</p>
                <i>
                  <p>{itinerary?.numberDay} Jours</p>
                </i>
              </div>
            </div>
          </div>
          <div className="click-detail-tip">
            {tipDetail.id ? (
              <>
                <h3 className="title-tips">{tipDetail.name}</h3>
                <div className="detail-content-itineraries">
                  <div className="name-adress">
                    <p>Adresse</p>
                    <p>{tipDetail.address}</p>
                  </div>
                  <div className="price-created-at">
                    {tipDetail.createdAt ? (
                      <p>Créé le: {new Date(tipDetail.createdAt).toLocaleDateString()}</p>
                    ) : (
                      <p>Date de création inconnue</p>
                    )}
                    <p>Prix :
                      <ProgressBar value={tipDetail.price} max={100}/>
                    </p>
                  </div>
                </div>
              </>
            ) : ''}
          </div>
        </div>
        <Map
          isInteractive={false}
          initialPosition={initialPosition}
          markers={geoTips}
          zoom={4}
          onMarkerClick={handleTipSelect}
        />
      </div>
      <div className="list-tips-itinerary">
        <h2 className="title-list-itinerary">Tous les tips de l'itinéraire</h2>
        <div className="tips-destination">
          {listTip.map(tip => (
            <Link key={tip.id} to={`/tips/${tip.id}`} className="card-destination">
              <div className="card-content-destination">
                <h3 className="card-title-destination">{tip.name}</h3>
                <button className="card-button-destination">Voir plus</button>
              </div>
              {pictureList.filter(picture => picture.idTips!.id === tip.id).slice(0, 1).map((picture: PictureModel) =>
                <img key={picture.id} src={"http://localhost:4000/" + picture.url} className="picture-tips-unit-card" alt="représentation de l'image"/>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItineraryDetail;
