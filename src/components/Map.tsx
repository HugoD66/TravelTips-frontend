import React, {useCallback, useEffect, useRef} from "react";
import maplibregl from 'maplibre-gl';
import {addMarker} from "../services/mapService";

interface MapProps {
  lat: number;
  lng: number;
  onCityFound: (city: any, postcode: any) => void;
}

const Map: React.FC<MapProps> = ({ lng, lat, onCityFound }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!lat || !lng || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=1bYmKrc8pg0FSu8GXalV`,
      center: [lng, lat],
      zoom: 5
    });
    map.current.on('load', () => {
      if (map.current) {
        addMarker(map.current, handleCityFound);

      }
    });

    return () => map.current?.remove();
  }, [lat, lng, onCityFound]);

  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [lng, lat],
      essential: true
    });
  }, [lat, lng]);


  const handleCityFound = useCallback(({ city, postcode }: any) => {
    console.log(city, postcode)
    onCityFound(city, postcode);
  }, [onCityFound]);


  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" style={{position: 'absolute',    width: '100%', height: '100%' }} />
    </div>
  );
};

export default Map;

