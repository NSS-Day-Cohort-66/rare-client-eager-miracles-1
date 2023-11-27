export const deleteTag = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    });
  };

