/* Register USER */
//TODO Change any to UserModel
import { UserModel } from "../models/UserModel";
import { UserLoginModel } from "../models/UserLoginModel";

export const registerUser = (
  firstname: String,
  lastname: String,
  birthday: String,
  mail: String,
  password: String
) => {
  console.log("la date est " + birthday);
  return fetch("http://localhost:4000/users/register", {
    method: "POST",
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      mail: mail,
      birthday: birthday,
      password: password,
    }),
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
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    });
};

/* Login USER */
//Todo add localstorage
export const loginUser = (mail: String, password: String) => {
  console.log(password);
  return fetch("http://localhost:4000/users/auth/login", {
    method: "POST",
    body: JSON.stringify({ mail: mail, password: password }),
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
      console.error("Erreur lors de la connexion:", error);
      throw error;
    });
};
// GET USER
export const getMe = (token: string) => {
  return fetch("http://localhost:8080/users/me", {
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
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    });
};

// GET USER BY ID
export const getUserById = (id: string) => {
  return fetch(`http://localhost:8080/users/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    });
};
// GET USERS
export const getUserList = () => {
  return fetch(`http://localhost:4700/users`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    });
};
// UPDATE ME

export const updateMe = (id: string, formData: UserModel, token: string) => {
  return fetch(`http://localhost:8080/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(formData),
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
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      throw error;
    });
};

// UPDATE USER

export const updateUser = (id: string, formData: any) => {
  return fetch(`http://localhost:8080/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(formData),
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
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      throw error;
    });
};

//REMOVE USER

export const removeUser = (id: string) => {
  return fetch(`http://localhost:8080/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    });
};
