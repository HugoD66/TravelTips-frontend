import {TipModel} from "../models/TipModel";

export const createTip = (tip: TipModel) => {
  return fetch("http://localhost:4000/tips", {
    method: "POST",
    body: JSON.stringify(tip),
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

export const getTipList = () => {
  return fetch(`http://localhost:4000/tips`, {
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

export const updateTip = (tip: TipModel) => {
  return fetch(`http://localhost:4000/tips/${tip.id}`, {
    method: "PUT",
    body: JSON.stringify(tip),
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
      console.error("Erreur lors de la modification du tip:", error);
      throw error;
  });
}

export const deleteTip = (id: string) => {
  return fetch(`http://localhost:4000/tips/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du tip:", error);
      throw error;
  });
}
