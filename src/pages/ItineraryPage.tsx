import React from 'react';
import {Link} from "react-router-dom";

const ItineraryPage = () => {

  return (
    <div>
      <h1>Bienvenue sur ton itinéraire</h1>
      <Link to={`/add-Tips`}>
              <button>Creer un tips</button>
      </Link>
    </div>
  );
};

export default ItineraryPage;
