export const getAllUsers = () => {
  return fetch("http://localhost:8000/rareusers", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getUserDetailsByUserId = (userId) => {
  return fetch(`http://localhost:8000/rareusers/${userId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
