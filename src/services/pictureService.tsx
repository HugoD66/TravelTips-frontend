export const createPicture = async (
  formData: FormData,
  userId: string,
  tipsId: string
) => {
  return fetch(
    `http://172.16.70.192:4000/picture/upload-file/${userId}/${tipsId}`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Network response was not OK");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while creating picture:", error.message);
      throw error;
    });
};

export const getPictures = async (tipsId: string) => {
  return fetch(`http://172.16.70.192:4000/picture/${tipsId}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while fetching pictures:", error);
      throw error;
    });
};
