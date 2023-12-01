export const createPostReaction = async (newPostReaction) => {
  const response = await fetch(`http://localhost:8000/postreactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newPostReaction),
  });
  return response;
};
