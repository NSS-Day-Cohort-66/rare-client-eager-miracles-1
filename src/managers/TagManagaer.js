export const deleteTag = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    });
  };

export const editTag = (tag) => {
  return fetch(`http://localhost:8000/tags/${tag.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag)
  }).then((res) => res.json());
};

export const fetchAndSetTags = () => {

  return fetch("http://localhost:8000/tags", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then(res => res.json());
};

export const postNewTag = async (newTag) => {
  await fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    });

}