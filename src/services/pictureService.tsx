import {PictureModel} from "../models/PictureModel";

export const createPicture = async (picture: PictureModel) => {
  return fetch(`http://localhost:4000/picture/upload-file/${picture.createdBy}/${picture.tipsId}`, {
    method: "POST",
    body: JSON.stringify(picture),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while creating picture:", error);
      throw error;
    });
}
