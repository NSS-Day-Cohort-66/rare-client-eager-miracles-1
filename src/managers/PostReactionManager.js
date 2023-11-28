export const createPostReaction = (newPostReaction) => {
  return (
    fetch(`http://localhost:8000/postreactions`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(newPostReaction),
    }
  );
};
