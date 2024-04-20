import {PictureModel} from "../models/PictureModel";

export const createPicture = async (picture: PictureModel, userId: string, tipsId: string) => {
  return fetch(`http://localhost:4000/upload-file/${userId}/${tipsId}`, {
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