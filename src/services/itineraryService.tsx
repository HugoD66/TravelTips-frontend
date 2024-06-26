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

export const getLastestItinerary = async () => {
  return fetch("http://localhost:4000/itinerary/latest", {
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
};

export const getItineraryUser = (id: string, token: string) => {
  return fetch(`http://localhost:4000/itinerary/users/${id}`, {
    method: "GET",
    headers: {
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

export const getItineraryList = () => {
  return fetch(`http://localhost:4000/itinerary`, {
    method: "GET",
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
      console.error("Erreur lors de la récupération des itinéraires:", error);
      throw error;
    });
};

export const getItineraryById = (id: string, token: string) => {
  return fetch(`http://localhost:4000/itinerary/${id}`, {
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
      console.error("Erreur lors de la récupération de l'itinéraire:", error);
      throw error;
    });
};

export const updateItinerary = (itineraryId: string, itinerary: ItineraryModel, token: string) => {
  return fetch(`http://localhost:4000/itinerary/${itineraryId}`, {
    method: "PATCH",
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

export const getPendingItinerary = (token: string) => {
  return fetch(`http://localhost:4000/itinerary/pendingItinerary`, {
    method: "GET",
    headers: {
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
      console.error("Erreur lors de la récupération des itineraires:", error);
      throw error;
    });
};

export const getApproveItinerary = (token: string) => {
  return fetch(`http://localhost:4000/itinerary/approvateItinerary`, {
    method: "GET",
    headers: {
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
      console.error("Erreur de la requête", error);
      throw error;
    });
};
export const getDisapproveItineraries = (token: string) => {
  return fetch(`http://localhost:4000/itinerary/disapproveItinerary`, {
    method: "GET",
    headers: {
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
      console.error("Erreur de la requête", error);
      throw error;
    });
};
export const approveItinerary = (id: string, token: string) => {
  return fetch(`http://localhost:4000/itinerary/approvate/${id}`, {
    method: "PATCH",
    headers: {
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
      console.error("Erreur de la requête", error);
      throw error;
    });
};

export const disapproveItinerary = (id: string, token: string) => {
  return fetch(`http://localhost:4000/itinerary/disapprove/${id}`, {
    method: "PATCH",
    headers: {
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
      console.error("Erreur de la requête", error);
      throw error;
    });
};
