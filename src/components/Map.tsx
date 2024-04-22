import React, {useCallback, useEffect, useRef} from "react";
import maplibregl from 'maplibre-gl';
import {addCountryMarkers, addMarker} from "../services/mapService";
import {useCity} from "../context/CityProvider";


interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  geoList?: { lat: string, lng: string }[];
}

const Map: React.FC<MapProps> = ({ lng, lat, zoom, geoList}) => {
  const { cityDetails, setCityDetails } = useCity();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);


  useEffect(() => {
    if (!lat || !lng || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=1bYmKrc8pg0FSu8GXalV`,
      center: [lng, lat],
      zoom: zoom === undefined ? 7 : zoom,
    });
    map.current.on('load', () => {
      if (map.current) {
        addMarker(map.current, handleCityFound);
        if (geoList) {
          addCountryMarkers(map.current, geoList);
        }
      }
    });

    return () => map.current?.remove();
  }, [lat, lng, geoList]);

  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [lng, lat],
      essential: true
    });
  }, [lat, lng]);


  const handleCityFound = useCallback(({ city, postcode, adress }: any) => {
    setCityDetails({ city, postcode, adress });
  }, [setCityDetails]);


  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;

