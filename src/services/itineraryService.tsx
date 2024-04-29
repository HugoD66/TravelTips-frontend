import { ItineraryModel } from "../models/ItineraryModel";

export const createItinerary = (itinerary: ItineraryModel, token: string) => {
  return fetch(`http://localhost:4000/itinerary`, {
    method: "POST",
    body: JSON.stringify(itinerary),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la création de l'itinéraire:", error);
      throw error;
    });
};

export const getItineraryList = (token: string) => {
  return fetch(`http://localhost:4000/itinerary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des itinéraires:", error);
      throw error;
    });
};

export const getItineraryById = (id: string) => {
  return fetch(`http://localhost:4000/itinerary/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'itinéraire:", error);
      throw error;
    });
};

export const updateItinerary = (itinerary: ItineraryModel) => {
  return fetch(`http://localhost:4000/itinerary/${itinerary.id}`, {
    method: "PUT",
    body: JSON.stringify(itinerary),
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
      console.error("Erreur lors de la modification de l'itinéraire:", error);
      throw error;
    });
};

export const deleteItinerary = (id: string) => {
  return fetch(`http://localhost:4000/itinerary/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'itinéraire:", error);
      throw error;
    });
};
