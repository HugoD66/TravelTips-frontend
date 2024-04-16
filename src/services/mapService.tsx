import { Marker, Map as MaplibreMap  } from "maplibre-gl";
import axios from 'axios';




let currentMarker: Marker | null = null;
export const addMarker = (map: MaplibreMap) => {
  map.on('click', async (event: maplibregl.MapMouseEvent) => {
    const {lng, lat} = event.lngLat;
    console.log(lng, lat)
    // Supprimer le marker précédent s'il existe
    if (currentMarker) {
      currentMarker.remove();
    }

    // Créer et ajouter un nouveau marker
    currentMarker = new Marker({color: '#00FF00'})
      .setLngLat([lng, lat])
      .addTo(map);

    console.log(`Marqueur ajouté à : ${lat}, ${lng}`);

    try {
      const cityDetails = await getCity(lat, lng);
      if (cityDetails && cityDetails.address && cityDetails.address.city) {
        console.log("City:", cityDetails.address.city);
      } else {
        console.log("City not found at this location.");
      }
    } catch (error) {
      console.error("Error fetching city details:", error);
    }
  });
}


export const getCity = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        format: 'json',
        lat: lat,
        lon: lng,
        addressdetails: 1
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error during reverse geocoding:', error);
    return null;
  }
};

