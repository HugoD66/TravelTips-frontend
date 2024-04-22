import { TipModel } from "../models/TipModel";

export const createTip = (tip: TipModel, token: string ) => {
  return fetch("http://localhost:4000/tips", {
    method: "POST",
    body: JSON.stringify(tip),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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
};

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
};

export const getTipListUser = (id: string) => {
  return fetch(`http://localhost:4000/tips/myTips/${id}`, {
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
export const getTipsByCityId = (id: string) => {
  return fetch(`http://localhost:4000/tips/by-city/${id}`, {
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
};

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
};

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
};

export const approveTip = (id: string) => {
  return fetch(`http://localhost:4000/tips/approvate/${id}`, {
    method: "PATCH",
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

export const disapproveTip = (id: string) => {
  return fetch(`http://localhost:4000/tips/disapprove/${id}`, {
    method: "PATCH",
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

export const getPendingTips = () => {
  return fetch(`http://localhost:4000/tips/pendingTips`, {
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

export const getApproveTips = () => {
  return fetch(`http://localhost:4000/tips/approvateTips`, {
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
export const getDisapproveTips = () => {
  return fetch(`http://localhost:4000/tips/disapproveTips`, {
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
