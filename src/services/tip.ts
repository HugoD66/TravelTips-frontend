import {TipModel} from "../models/TipModel";

export const createTip = (tip: TipModel) => {

}

export const getTipList = () => {
  return fetch(`http://localhost:4700/tips`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des tips:", error);
      throw error;
  });
}

export const getTipById = (id: string) => {
  return fetch(`http://localhost:4700/tips/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du tip:", error);
      throw error;
  });
}
