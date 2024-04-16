/*
import maplibregl, {Marker} from "maplibre-gl";
import React from "react";

export const setMarkerByCoordinates = (x: number, y: number, map: maplibregl.Map, currentMarkerRef: React.MutableRefObject<Marker | null>) => {
  console.log("Ajout du marqueur à", { x, y });
  if (map) {
    if (currentMarkerRef.current) {
      console.log("Suppression du marqueur précédent");
      currentMarkerRef.current.remove();
    }
    console.log("Création d'un nouveau marqueur");
    currentMarkerRef.current = new Marker({ color: `#FF0000` })
      .setLngLat([x, y])
      .addTo(map);
  }
};

 */

export {}
