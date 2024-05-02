import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import "../styles/tipspage.css";
import { getTipById } from "../services/tipService";
import { PictureModel } from "../models/PictureModel";
import { Link } from 'react-router-dom';
import Map, {TipLocation} from "../components/Map";
import {TipModel} from "../models/TipModel";
import {useTip} from "../context/TipProvider";
import defaultPicture from "../styles/pictures/defaultTipsPIcture.jpg";
import {getPictures} from "../services/pictureService";


interface Tip {
  id: string;
  name: string;
  address: string;
  images: string[];
  price: number;
  createdAt: string;
}

const TipsPage: React.FC = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const { tipDetail, setTipDetail } = useTip();
  const [tip, setTip] = useState<TipModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pictureList, setPictureList] = useState<PictureModel[]>([]);
  const [geoTips, setGeoTips] = useState<TipLocation[]>([]);

  useEffect(() => {
    const fetchTipDetails = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token is missing');
          return;
        }

        if (!tipId) {
          setError('Tip ID is not provided');
          return;
        }

        try {
          const response = await getTipById(tipId, token);
          console.log(response);
          setTip(response);
          setGeoTips([{
            lat: response.lat,
            lng: response.lng,
            tipSelected: response
          }]);

          const pictureResponses = await getPictures(response.id);

          setPictureList(pictureResponses);


        } catch (error) {
          console.error("Error fetching tip details:", error);
          setError('Failed to fetch tip details. Please check the console for more information.');
        }
      };


    if (tipId) {
      fetchTipDetails();
    }
  }, [tipId]);

  const handleTipSelect = useCallback((tipDetail: any) => {
  }, [setTipDetail]);

  if (!tip) {
    return <p>Aucune information sur le tips...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="tip-page">
      {tip ? (
        <>
        <div className="tip-header">
            <h3 className="tip-title">{tip.name}</h3>
            <p className="tip-description">{tip.address}</p>
            <p className="tip-price">Prix : {tip.price}</p>
          {tip.createdAt && (
            <p className="tip-creation-date">Créé le : {new Date(tip.createdAt).toLocaleDateString()}</p>
          )}
        </div>
          <Map
            isInteractive={false}
            initialPosition={{lat: parseInt(tip.lat), lng: parseInt(tip.lng)}}
            markers={geoTips}
            onMarkerClick={handleTipSelect}
          />
          <div className="tip-img">
            {pictureList.filter(picture => picture.idTips!.id === tip.id).length > 0 ?
              pictureList.map((picture: PictureModel) =>
                picture.idTips!.id === tip.id ?
                  <img src={"http://localhost:4000/" + picture.url} className="picture-tips-unit-card"
                       alt="représentation de l'image"/> : null
              ) :
              <img src={defaultPicture} alt="Image par défaut"/>
            }
        </div>
        </>
      ) : (
        <p>Aucune information sur le tips...</p>
      )}
    </div>
  );


};

export default TipsPage;
