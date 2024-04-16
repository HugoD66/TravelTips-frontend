export const createCountry = (country: any) => {
  return fetch(`http://localhost:4000/country`, {
    method: "POST",
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
      console.error("Erreur lors de la création du country:", error);
      throw error;
  });
}

export const getCountryList = () => {
  return fetch(`http://localhost:4000/country`, {
    method: "GET",
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
}

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
}

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
}

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
}
