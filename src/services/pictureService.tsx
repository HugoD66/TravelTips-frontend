
export const createPicture = async (formData: FormData, userId: string, tipsId: string) => {
  return fetch(`http://localhost:4000/picture/upload-file/${userId}/${tipsId}`, {
    method: "POST",
    body: formData,
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
