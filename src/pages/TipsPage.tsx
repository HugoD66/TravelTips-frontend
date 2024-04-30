import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/tipspage.css";
import { getTipById } from "../services/tipService";
import { PictureModel } from "../models/PictureModel";
import { Link } from 'react-router-dom';


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
  const [tip, setTip] = useState<Tip | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pictureList, setPictureList] = useState<PictureModel[]>([]);

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
          const response = await fetch(`http://localhost:4000/tips/${tipId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setTip(data);
        } catch (error) {
          console.error("Error fetching tip details:", error);
          setError('Failed to fetch tip details. Please check the console for more information.');
        }
      };
      

    if (tipId) {
      fetchTipDetails();
    }
  }, [tipId]);

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
            <p className="tip-creation-date">Créé le : {new Date(tip.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="tip-img">
            {pictureList.filter(picture => picture.idTips!.id === tip.id).length > 0 ?
            pictureList.map((picture: PictureModel) =>
                picture.idTips!.id === tip.id ?
                <img src={"http://localhost:4000/" + picture.url}  className="tip-image" alt="tip"/> : null
            ) :
            Array.from({ length: 6 }).map((_, index) =>
                <img src={`https://picsum.photos/400/200?random=${index}`} className="tip-image" alt="Default view"/>
            )
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
