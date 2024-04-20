import React, {useCallback, useEffect, useRef} from "react";
import maplibregl from 'maplibre-gl';
import {addMarker} from "../services/mapService";
import {useCity} from "../context/CityProvider";


interface MapProps {
  lat: number;
  lng: number;
}

const Map: React.FC<MapProps> = ({ lng, lat}) => {
  const { cityDetails, setCityDetails } = useCity();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);


  useEffect(() => {
    if (!lat || !lng || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=1bYmKrc8pg0FSu8GXalV`,
      center: [lng, lat],
      zoom: 8,
    });
    map.current.on('load', () => {
      if (map.current) {
        addMarker(map.current, handleCityFound);
      }
    });

    return () => map.current?.remove();
  }, [lat, lng]);

  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [lng, lat],
      essential: true
    });
  }, [lat, lng]);


  const handleCityFound = useCallback(({ city, postcode }: any) => {
    setCityDetails({ city, postcode });
  }, [setCityDetails]);


  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;

