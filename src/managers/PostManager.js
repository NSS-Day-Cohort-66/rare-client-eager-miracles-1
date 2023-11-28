export const getPosts = () => {
  return fetch("http://localhost:8000/posts", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("auth_token")).token
      }`,
    },
  }).then((res) => res.json());
};

export const fetchMyPosts = async () => {
  const response = await fetch("http://localhost:8000/posts?user=current", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return response.json();
};
