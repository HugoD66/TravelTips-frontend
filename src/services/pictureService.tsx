import {PictureModel} from "../models/PictureModel";

export const createPicture = async (picture: PictureModel) => {
  return fetch("http://localhost:4000/tips", {
    method: "POST",
    body: JSON.stringify(picture),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la création du tip:", error);
      throw error;
    });
}