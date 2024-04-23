import {useCallback, useEffect, useRef} from "react";
import {addMarker, setCountryMarkersOnMap} from "../services/mapService";
import {useCity} from "../context/CityProvider";
import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  isInteractive: boolean; //Pour AddTips
  initialPosition: { lat: number, lng: number }; //Pour AddTips
  markers?: { lat: string, lng: string }[]; //Pour CountryPage
  onLocationSelect?: (location: { lat: number, lng: number }) => void;

  lat?: number;
  lng?: number;
  zoom?: number;  //Pour AddTips au moment se la séléction du pays
  geoList?: { lat: string, lng: string }[]; //Pour CountryPage
}

const Map: React.FC<MapProps> = ({isInteractive, onLocationSelect, initialPosition, markers, lng, lat, zoom, geoList}) => {
  const { cityDetails, setCityDetails } = useCity();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=1bYmKrc8pg0FSu8GXalV`,
      center: [initialPosition.lng, initialPosition.lat],
      zoom:  7 ,
    });

    if(isInteractive && cityDetails && map.current) {
      map.current.on('click', () => {
        if (!map.current) return;
        addMarker(map.current, handleCityFound);
      });
    }

    if(!isInteractive) {

      map.current.on('load', () => {
        if (!cityDetails || !map.current || !markers) return;
        console.log(markers)
        const stringMarkers = markers.map(marker => ({
          lat: marker.lat.toString(),
          lng: marker.lng.toString()
        }));
        setCountryMarkersOnMap(map.current, stringMarkers);
      });
    }

    return () => map.current?.remove();
  }, [isInteractive, lat, lng, geoList]);

  useEffect(() => {
    if (!map.current || !markers) return;

    if (map.current.isStyleLoaded()) {  // Vérifie si le style de la carte est chargé
      setCountryMarkersOnMap(map.current, markers.map(marker => ({
        lat: marker.lat.toString(),
        lng: marker.lng.toString()
      })));
    } else {
      map.current.on('load', () => {
        setCountryMarkersOnMap(map.current!, markers.map(marker => ({
          lat: marker.lat.toString(),
          lng: marker.lng.toString()
        })));
      });
    }
  }, [markers]);

  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [initialPosition.lng, initialPosition.lat],
      essential: true
    });
  }, [initialPosition.lat, initialPosition.lng]);


  const handleCityFound = useCallback(({ city, postcode, address, lat, lng }: any) => {
    setCityDetails({ city, postcode, address, lat, lng});
  }, [setCityDetails]);


  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;

/*
import React, {useCallback, useEffect, useRef} from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {setCountryMarkersOnMap, addMarker} from "../services/mapService";
import {useCity} from "../context/CityProvider";

interface MapProps {
  isInteractive: boolean; //Pour AddTips
  initialPosition: { lat: number, lng: number }; //Pour AddTips
  markers?: { lat: string, lng: string }[]; //Pour CountryPage
  onLocationSelect?: (location: { lat: number, lng: number }) => void;

  lat?: number;
  lng?: number;
  zoom?: number;  //Pour AddTips au moment se la séléction du pays
  geoList?: { lat: string, lng: string }[]; //Pour CountryPage
}

const Map: React.FC<MapProps> = ({isInteractive, onLocationSelect, initialPosition, markers, lng, lat, zoom, geoList}) => {
  const { cityDetails, setCityDetails } = useCity();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=1bYmKrc8pg0FSu8GXalV`,
      center: [initialPosition.lng, initialPosition.lat],
      zoom:  7 ,
    });

    if(isInteractive && cityDetails && map.current) {
      map.current.on('click', () => {
        if (!map.current) return;
          addMarker(map.current, handleCityFound);
      });
    }

    if(!isInteractive) {

      map.current.on('load', () => {
        if (!cityDetails || !map.current || !markers) return;
        console.log(markers)
        const stringMarkers = markers.map(marker => ({
          lat: marker.lat.toString(),
          lng: marker.lng.toString()
        }));
        setCountryMarkersOnMap(map.current, stringMarkers);
      });
    }

    return () => map.current?.remove();
  }, [isInteractive, lat, lng, geoList]);

  useEffect(() => {
    if (!map.current || !markers) return;

    if (map.current.isStyleLoaded()) {  // Vérifie si le style de la carte est chargé
      setCountryMarkersOnMap(map.current, markers.map(marker => ({
        lat: marker.lat.toString(),
        lng: marker.lng.toString()
      })));
    } else {
      map.current.on('load', () => {
        setCountryMarkersOnMap(map.current!, markers.map(marker => ({
          lat: marker.lat.toString(),
          lng: marker.lng.toString()
        })));
      });
    }
  }, [markers]);

  useEffect(() => {
    if (!map.current) return;
    map.current.flyTo({
      center: [initialPosition.lng, initialPosition.lat],
      essential: true
    });
  }, [initialPosition.lat, initialPosition.lng]);


  const handleCityFound = useCallback(({ city, postcode, adress, lat, lng }: any) => {
    setCityDetails({ city, postcode, adress, lat, lng});
  }, [setCityDetails]);


  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;

*/
