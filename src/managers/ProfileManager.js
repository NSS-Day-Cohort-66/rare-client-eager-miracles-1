export const getAllUsers = () => {
  return fetch("http://localhost:8000/rareusers", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
