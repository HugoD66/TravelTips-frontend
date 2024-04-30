import { CityModel } from "../models/CityModel";

export const createCity = (city: CityModel) => {
  return fetch(`http://localhost:4000/city`, {
    method: "POST",
    body: JSON.stringify(city),
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
      console.error("Erreur lors de la création de la ville:", error);
      throw error;
    });
};

export const getCityList = () => {
  return fetch(`http://localhost:4000/city`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des villes:", error);
      throw error;
    });
};

export const getCityByName = (cityName: string) => {
  return fetch(`http://localhost:4000/city/by-name/${cityName}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de la ville:", error);
      throw error;
    });
};

export const getCityById = (id: string) => {
  return fetch(`http://localhost:4000/city/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de la ville:", error);
      throw error;
    });
};

export const updateCity = (city: CityModel) => {
  return fetch(`http://localhost:4000/city/${city.id}`, {
    method: "PUT",
    body: JSON.stringify(city),
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
      console.error("Erreur lors de la modification de la ville:", error);
      throw error;
    });
};

export const deleteCity = (id: string) => {
  return fetch(`http://localhost:4000/city/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la ville:", error);
      throw error;
    });
};
