/* Register USER */
export const registerUser = (
  firstname: String,
  lastname: String,
  birthday: String,
  mail: String,
  password: String
) => {
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
        throw new Error("L'inscription a échoué");
      }
      if (response.status === 400) {
        // Gérer l'erreur "BdRequets"
        throw new Error(
          "Vérifier que les champs sont bien remplis ou contacter l'utilisateur."
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    });
};

/* Login USER */
export const loginUser = async (mail: String, password: String) => {
  try {
    console.log(password);
    const response = await fetch("http://localhost:4000/users/auth/login", {
      method: "POST",
      body: JSON.stringify({ mail: mail, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response);
      if (response.status === 401) {
        // Gérer l'erreur "Unauthorized" (statut 401)
        throw new Error("Le mot de passe ou/et l'adresse mail est incorrect");
      } else {
        // Gérer d'autres erreurs
        throw new Error("Erreur réseau");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};
// GET USER
export const getMe = (token: string, id: string) => {
  return fetch(`http://localhost:4000/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Utilisateur non trouvé");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    });
};

// GET USERS
export const getUserList = (token: string) => {
  return fetch(`http://localhost:4000/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("PTN PK CA MARCHE PAS JV CABLER");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    });
};
// UPDATE ME
export const updateMe = (
  id: string,
  firstname: String,
  lastname: String,
  birthday: String,
  mail: String,
  password: String,
  token: string
) => {
  return fetch(`http://localhost:4000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      mail: mail,
      birthday: birthday,
      password: password,
    }),
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
  return fetch(`http://localhost:4000/users/${id}`, {
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

export const removeUser = (id: string, token: string) => {
  return fetch(`http://localhost:4000/users/${id}`, {
    method: "DELETE",
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
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    });
};
