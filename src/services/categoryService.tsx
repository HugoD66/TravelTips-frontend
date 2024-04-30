import { CategoryModel } from "../models/CategoryModel";

export const createCategory = (category: CategoryModel) => {
  return fetch(`http://localhost:4000/category`, {
    method: "POST",
    body: JSON.stringify(category),
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
      console.error("Erreur lors de la création de la catégorie:", error);
      throw error;
    });
};

export const getCategoryList = (token: string) => {
  return fetch(`http://localhost:4000/category`, {
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
      console.error("Erreur lors de la récupération des catégories:", error);
      throw error;
    });
};

export const getCategoryById = (id: string) => {
  return fetch(`http://localhost:4000/category/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de la catégorie:", error);
      throw error;
    });
};

export const updateCategory = (category: CategoryModel) => {
  return fetch(`http://localhost:4000/category/${category.id}`, {
    method: "PUT",
    body: JSON.stringify(category),
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
      console.error("Erreur lors de la modification de la catégorie:", error);
      throw error;
    });
};

export const deleteCategory = (id: string) => {
  return fetch(`http://localhost:4000/category/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la catégorie:", error);
      throw error;
    });
};
