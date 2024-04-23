import React, { useCallback, useEffect, useRef } from "react";
import { addMarker } from "../services/mapService";
import { useCity } from "../context/CityProvider";
import maplibregl, {Marker} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {TipModel} from "../models/TipModel";

interface MapProps {
  isInteractive: boolean;
  initialPosition: { lat: number; lng: number };
  markers?: TipLocation[];
  onLocationSelect?: (location: {
    lat: number;
    lng: number;
    city: string;
    postcode: string;
    address: string;
  }) => void;
  onMarkerClick?: (tip: any) => void;
}

export interface TipLocation {
  lat: string;
  lng: string;
  tipSelected: any;
}

const Map: React.FC<MapProps> = ({
  isInteractive,
  onLocationSelect,
  initialPosition,
  markers,
  onMarkerClick,
}) => {
  const { cityDetails, setCityDetails } = useCity();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=1bYmKrc8pg0FSu8GXalV`,
      center: [initialPosition.lng, initialPosition.lat],
      zoom: 4,
    });

    if (markers && map.current) {
      setCountryMarkersOnMap(map.current, markers, onMarkerClick);
    }

    if (isInteractive && cityDetails && map.current) {
      map.current.on("click", () => {
        if (!map.current) return;
        addMarker(map.current, handleCityFound);
      });
    }

    return () => map.current?.remove();
  }, [isInteractive, markers]);

  useEffect(() => {
    if (!map.current || !markers ) return;
      if(!isInteractive) {
        if (map.current.isStyleLoaded()) {
          setCountryMarkersOnMap(
            map.current,
            markers,
            handleMarkerClick
          );
        } else {
          map.current.on("load", () => {
            setCountryMarkersOnMap(
              map.current!,
              markers,
              handleMarkerClick
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

  const handleMarkerClick = (marker: TipLocation) => {
    if (onMarkerClick && token) {
      console.log(marker.tipSelected)
      onMarkerClick(marker.tipSelected);
    }
  };

  const setCountryMarkersOnMap = (
    map: maplibregl.Map,
    markers: TipLocation[],
    handleMarkerClick?: (tip: any) => void
  ) => {
    markers.forEach(marker => {
      const { lat, lng, tipSelected } = marker;
      const mapMarker = new Marker({ color: '#FF6347' })
        .setLngLat([parseFloat(lng), parseFloat(lat)])
        .addTo(map);

      // Assurez-vous que tipSelected contient les données nécessaires
      mapMarker.getElement().addEventListener('click', () => {
        console.log('azeazeaze')
        if (handleMarkerClick && tipSelected) {
          console.log('loulou')

          handleMarkerClick(tipSelected);
          console.log(tipSelected)

        } else {
          console.log("Tip selected is undefined or handleMarkerClick is not a function");
        }
      });
    });
  };
  const handleCityFound = useCallback(
    ({ city, postcode, address, lat, lng }: any) => {
      setCityDetails({ city, postcode, address, lat, lng });
      if (onLocationSelect) {
        onLocationSelect({ city, postcode, address, lat, lng });
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
