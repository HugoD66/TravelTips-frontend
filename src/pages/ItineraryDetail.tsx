import {Link, useParams} from "react-router-dom";
import {ItineraryModel} from "../models/ItineraryModel";
import React, {useCallback, useEffect, useState} from "react";
import {getItineraryById} from "../services/itineraryService";
import Map, {TipLocation} from "../components/Map";
import {TipModel} from "../models/TipModel";
import {getLastestTips} from "../services/tipService";
import {getPictures} from "../services/pictureService";
import {PictureModel} from "../models/PictureModel";
import defaultPicture from "../styles/pictures/defaultTipsPIcture.jpg";
import {useTip} from "../context/TipProvider";
import ProgressBar from "../components/ProgressBar";
import {findAllByItineraryId} from "../services/dayItineraryService";

const ItineraryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { tipDetail, setTipDetail } = useTip();
  const [itinerary, setItinerary] = useState<ItineraryModel>();
  const token = localStorage.getItem('token');
  const [listTip, setTipList] = useState<TipModel[]>([]);
  const [pictureList, setPictureList] = useState<PictureModel[]>([]);
  const [geoTips, setGeoTips] = useState<TipLocation[]>([]);
  useEffect(() => {
    fetchItinerary();
  }, []);

  const fetchItinerary = async () => {
    try {
      if(!token || !id) {
        return;
      }
      const response = await getItineraryById(id, token);
      setItinerary(response);
      const responseDayItinerary = await findAllByItineraryId(response.id)
      console.log(responseDayItinerary)
      const tips = responseDayItinerary.map((dayItinerary: any) => dayItinerary.idTips);
      setTipList(tips);

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

    } catch (error) {
      console.error('Erreur lors de la récupération de l\'itinéraire:', error)
    }
  }

  const handleTipSelect = useCallback((tipDetail: any) => {
    setTipDetail(tipDetail);
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
          initialPosition={{ lat: 47, lng: -2 }}
          markers={geoTips}
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
              {pictureList.find(picture => picture.idTips!.id === tip.id) ? (
                <div
                  className="card-destination-image"
                  style={{backgroundImage: `url(http://localhost:4000/${pictureList.find(picture => picture.idTips!.id === tip.id)?.url})`}}
                ></div>
              ) : (
                <div
                  className="card-destination-image"
                  style={{backgroundImage: `url(https://picsum.photos/400/200?random=${tip.id})`}}
                ></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItineraryDetail;
