// import { useEffect, useRef, useState } from "react";
// import maplibregl, { Marker } from 'maplibre-gl';

// const Map = () => {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<maplibregl.Map | null>(null);
//   const currentMarker = useRef<Marker | null>(null);
//   const [lng] = useState(139.753);
//   const [lat] = useState(35.6844);
//   const [zoom] = useState(14);
//   const [API_KEY] = useState('1bYmKrc8pg0FSu8GXalV');

//   return (
//     <div>
//       <div className="map-wrap">
//         <div ref={mapContainer} className="map" />
//       </div>
//     </div>
//   );
// };

// export default Map;
// /*
//       <button onClick={addMarker}>Ajouter un point</button>

//  useEffect(() => {
//     if (map.current || !mapContainer.current) return;

//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
//       center: [lng, lat],
//       zoom: zoom
//     });
//   }, [API_KEY, lng, lat, zoom]);

//   const addMarker = () => {

//     if (!map.current) return;
//     /*
//      // Supprime le marqueur précédent s'il existe
//      if (currentMarker.current) {
//        currentMarker.current.remove();
//      }
// currentMarker.current = new Marker({ color: `#FF0000` })
//   .setLngLat([lng, lat])
//   .addTo(map.current);
// };

//  */
