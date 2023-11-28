// define api url for posts
const api_url = "http://localhost:8000/posts";

// get all post - unfiltered
export const getAllPosts = () => {
  return fetch(`${api_url}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("auth_token")).token
      }`,
    },
  }).then((res) => res.json());
};

// get all post - filtered by date and approved
export const fetchAllPostsAndFilterByDate = async () => {
  const response = await fetch(`${api_url}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  const posts = await response.json();
  const approvedPosts = posts
    .filter((post) => post.approved === true)
    .sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
  return approvedPosts;
};

// get post by id
export const getPostById = async (postId) => {
  let url = `${api_url}/${postId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

// create a new post
export const createNewPost = async (newItem) => {
  const response = await fetch(`${api_url}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  return response;
};

// delete post
export const deletePost = async (postId) => {
  const response = await fetch(`${api_url}/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
