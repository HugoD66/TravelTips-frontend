import { Marker, Map as MaplibreMap  } from "maplibre-gl";
import axios from 'axios';

let currentMarker: Marker | null = null;
export const addMarker = (map: MaplibreMap, onCityFound: (details: { city: string; postcode: string; adress: string; lat: string; lng: string }) => void) => {
  map.on('click', async (event: maplibregl.MapMouseEvent) => {
    const {lng, lat} = event.lngLat;
    if (currentMarker) {
      currentMarker.remove();
    }
    currentMarker = new Marker({color: '#00FF00'})
      .setLngLat([lng, lat])
      .addTo(map);
    try {
      const cityDetails = await getCity(lat, lng);
      console.log(cityDetails);
      if (cityDetails && cityDetails.address) {
        const city = cityDetails.address.city || "Ville non spécifiée";
        const postcode = cityDetails.address.postcode || "Code postal non spécifié";
        const adress = cityDetails.address.road || "Rue non spécifiée";
        const lat = cityDetails.lat;
        const lng = cityDetails.lon;
        onCityFound({ city, postcode, adress, lat, lng});
      } else {
        onCityFound({ city: "Ville non spécifiée", postcode: "Code postal non spécifié", adress: "Rue non spécifiée", lat: "", lng: ""});
      }
    } catch (error) {
      console.error("Error fetching city details:", error);
      onCityFound({ city: "Ville non spécifiée", postcode: "Code postal non spécifié", adress: "Rue non spécifiée", lat: "", lng: ""});
    }
  });
}

export const setCountryMarkersOnMap = (map: MaplibreMap, markers: { lat: string; lng: string }[]) => {

  markers.forEach(geo => {

    const { lat, lng } = geo;
    new Marker({ color: '#FF6347' })
      .setLngLat([parseFloat(lng), parseFloat(lat)])
      .addTo(map);
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

