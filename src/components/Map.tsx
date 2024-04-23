import React, { useCallback, useEffect, useRef } from "react";
import { addMarker, setCountryMarkersOnMap } from "../services/mapService";
import { useCity } from "../context/CityProvider";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  isInteractive: boolean; //Pour AddTips
  initialPosition: { lat: number; lng: number }; //Pour AddTips
  markers?: { lat: string; lng: string }[]; //Pour CountryPage
  onLocationSelect?: (location: { lat: number; lng: number }) => void;

  /*
  lat?: number;
  lng?: number;
  zoom?: number;  //Pour AddTips au moment se la séléction du pays
  geoList?: { lat: string, lng: string }[]; //Pour CountryPage
  */
}

const Map: React.FC<MapProps> = ({
  isInteractive,
  onLocationSelect,
  initialPosition,
  markers,
}) => {
  const { cityDetails, setCityDetails } = useCity();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=1bYmKrc8pg0FSu8GXalV`,
      center: [initialPosition.lng, initialPosition.lat],
      zoom: 4,
    });

    if (isInteractive && cityDetails && map.current) {
      map.current.on("click", () => {
        if (!map.current) return;
        addMarker(map.current, handleCityFound);
      });
    }

    return () => map.current?.remove();
  }, [isInteractive, markers]);

  useEffect(() => {
    if (!map.current || !markers) return;
    if (!isInteractive) {
      if (map.current.isStyleLoaded()) {
        // Vérifie si le style de la carte est chargé
        setCountryMarkersOnMap(
          map.current,
          markers.map((marker) => ({
            lat: marker.lat.toString(),
            lng: marker.lng.toString(),
          }))
        );
      } else {
        map.current.on("load", () => {
          setCountryMarkersOnMap(
            map.current!,
            markers.map((marker) => ({
              lat: marker.lat.toString(),
              lng: marker.lng.toString(),
            }))
          );
        });
      }
    }
  }, [markers]);

  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [initialPosition.lng, initialPosition.lat],
      essential: true,
    });
  }, [initialPosition.lat, initialPosition.lng]);

  const handleCityFound = useCallback(
    ({ city, postcode, address, lat, lng }: any) => {
      setCityDetails({ city, postcode, address, lat, lng });
      if (onLocationSelect) {
        onLocationSelect({ lat, lng });
      }
    },
    [setCityDetails, onLocationSelect]
  );

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
