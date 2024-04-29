import { ItineraryModel } from "../models/ItineraryModel";
import { DayItineraryModel } from "../models/DayItineraryModel";

export const createDayItinerary = (
  dayInItinerary: DayItineraryModel,
  token: string
) => {
  return fetch(`http://localhost:4000/day-itinerary`, {
    method: "POST",
    body: JSON.stringify(dayInItinerary),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      console.log(JSON.stringify(response));
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la création du dayInItinerary:", error);
      throw error;
    });
};

export const getDayInItineraryList = () => {
  return fetch(`http://localhost:4000/day-itinerary`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des dayInItinerary:",
        error
      );
      throw error;
    });
};

export const getDayInItineraryById = (id: string) => {
  return fetch(`http://localhost:4000/day-itinerary/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du dayInItinerary:", error);
      throw error;
    });
};

export const updateDayInItinerary = (dayInItinerary: DayItineraryModel) => {
  return fetch(`http://localhost:4000/day-itinerary/${dayInItinerary.id}`, {
    method: "PUT",
    body: JSON.stringify(dayInItinerary),
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
      console.error("Erreur lors de la mise à jour du dayInItinerary:", error);
      throw error;
    });
};

export const deleteDayInItinerary = (id: string) => {
  return fetch(`http://localhost:4000/day-itinerary/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du dayInItinerary:", error);
      throw error;
    });
};
