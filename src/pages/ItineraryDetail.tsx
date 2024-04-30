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
    fetchTips();
  }, []);

  const fetchItinerary = async () => {
    try {
      if(!token || !id) {
        return;
      }
      const response = await getItineraryById(id, token);
      setItinerary(response);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'itinéraire:', error)
    }
  }

  // TEMPORAIRE
  const fetchTips = async () => {
    try {
      if (!token) {
        console.log("No token available.");
        return;
      }
      const response = await getLastestTips(token);
      if (response) {
        const allPicturePromises = response.map(async (tip: TipModel) => {
          const pictureResponses = await getPictures(tip.id!);
          return pictureResponses.map((picture: PictureModel) => ({
            ...picture,
            tipId: tip.id
          }));
        });

        const allGeoTips = response.map((tip: TipLocation) => ({
          lat: tip.lat,
          lng: tip.lng,
          tipSelected: tip
        }));
         setGeoTips(allGeoTips);
        console.log(allGeoTips)
        const picturesArrays = await Promise.all(allPicturePromises);
        const allPictures = picturesArrays.flat();
        setPictureList(allPictures);
        setTipList(response);
      }
    } catch (error) {
      console.error('Error fetching tips:', error);
    }
  };

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
                <p>Nombre de Tips : 6</p>
                <i><p>{itinerary?.numberDay} Jours</p></i>
              </div>
            </div>
          </div>
          <div className="click-detail-tip">
            {tipDetail.id ? (
              <>
                <h3 className="title-tips">Information sur le Tip:</h3>
                <div className="detail-content">
                  <div className="name-adress">
                    <p>Nom: {tipDetail.name}</p>
                    <p>Adresse: {tipDetail.address}</p>
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
          initialPosition={{lat: 47, lng: -2}}
          markers={geoTips}
          onMarkerClick={handleTipSelect}
        />
      </div>
      <div className="list-tips-itinerary">
        <h2 className="title-list-itinerary">Tous les tips de l'itinéraire</h2>
        <div className="tips-carousel">
          {listTip.map(tip => (
            <Link key={tip.id} to={`/tips/${tip.id}`}>
              <div className="card">
                <div className="card__background">
                  {pictureList.filter(picture => picture.idTips!.id === tip.id).length > 0 ?
                    pictureList.map((picture: PictureModel) =>
                      picture.idTips!.id === tip.id ?
                        <img src={"http://localhost:4000/" + picture.url} alt="représentation de l'image"/> : null
                    ) :
                    <img src={defaultPicture} alt="Image par défaut"/>
                  }
                </div>
                <div className="card__content">
                  <div className="card__title">
                    {tip.name}
                  </div>
                  <button className="card__button">Voir plus</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>

  );
}

export default ItineraryDetail;
