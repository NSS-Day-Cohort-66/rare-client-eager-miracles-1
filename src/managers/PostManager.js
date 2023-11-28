export const getAllPosts = () => {
    return fetch("http://localhost:8000/posts", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("auth_token")).token
        }`
      },
    }).then((res) => res.json());
  };


export const fetchAllPostsAndFilterByDate = async () => {
  const response = await fetch(`http://localhost:8000/posts`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  const posts = await response.json();
  const approvedPosts = posts
    .filter((post) => post.approved === true)
    .sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
  return approvedPosts;
};

export const deletePost = async (postId) => {
  const response = await fetch(`http://localhost:8000/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
