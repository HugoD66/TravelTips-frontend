import { ApiResponse } from "../models/CountryData";
import axios from "axios";
const token = localStorage.getItem('token');

export const createCountry = (country: any) => {
  return fetch(`http://localhost:4000/country`, {
    method: "POST",
    body: JSON.stringify(country),
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
      console.error("Erreur lors de la création du country:", error);
      throw error;
    });
};

export const getCountryList = (token: string) => {
  return fetch(`http://localhost:4000/country`, {
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
      console.error("Erreur lors de la récupération des countries:", error);
      throw error;
    });
};

export const getCountriesById = (id: string) => {
  return fetch(`http://localhost:4000/country/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du country:", error);
      throw error;
    });
};
export const getCountryByName = (countryName: string) => {
  return fetch(`http://localhost:4000/country/get-by-name/${countryName}`, {
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
    .then((data) => {
      if (data.length === 0 || !data) {
        return {
          message: "Aucun centre d'intérêt nous a été renseigné dans ce pays.",
        };
      }
      return data;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du country:", error);
      return {
        message: "Aucun centre d'intérêt nous a été renseigné dans ce pays.",
      };
    });
};
export const updateCountry = (country: any) => {
  return fetch(`http://localhost:4000/country/${country.id}`, {
    method: "PUT",
    body: JSON.stringify(country),
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
      console.error("Erreur lors de la modification du country:", error);
      throw error;
    });
};

export const deleteCountry = (id: string) => {
  return fetch(`http://localhost:4000/country/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du country:", error);
      throw error;
    });
};

export const fetchCountryByName = async (countryName: string) => {
  try {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    const response = await axios.get<ApiResponse[]>(url);
    if (response.data && response.data.length > 0) {
      const country = response.data[0];
      return {
        name: country.name.common,
        alpha3Code: "TODO", // country.cca3
        latlng: country.latlng,
      };
    } else {
      throw new Error("No country found with the specified name");
    }
  } catch (error) {
    console.error("Fetching countries data failed", error);
    throw error;
  }
};

export const fetchCountryList = async () => {
  try {
    const response = await axios.get<ApiResponse[]>(
      "https://restcountries.com/v3.1/all"
    );
    const fetchedCountries = response.data.map((country) => ({
      name: country.name.common,
      alpha3Code: country.cca3,
      latlgn: country.latlng,
    }));
    return fetchedCountries;
    /*setCountriesList(fetchedCountries);*/
  } catch (error) {
    console.error("Fetching countries data failed", error);
    throw error;
  }
};
