export const getPosts = () => {
  return fetch("http://localhost:8000/posts", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("auth_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const getPostById = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
