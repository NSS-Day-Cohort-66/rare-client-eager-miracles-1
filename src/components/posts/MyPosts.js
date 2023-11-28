import { useState, useEffect } from "react";
import "./PostList.css";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../managers/PostManager";


export const MyPostList = () => {
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    const response = await fetch("http://localhost:8000/posts?user=current", {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
    const posts = await response.json();
    setMyPosts(posts);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const btnToCreate = () => {
    navigate("/create");
  };

  const handleDeletePost = async (postId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) {
      return; // If user clicks 'Cancel', exit the function
    }
  
    try {
      await deletePost(postId);
      setMyPosts(myPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  return (
    <div className="background-wrapper">
      <div className="container">
        <div className="header-container">
          <h1 className="post-header">Posts</h1>
          <button
            type="button"
            className="settings-button"
            onClick={btnToCreate}
          >
            <i className="settings-icon fas fa-plus"></i>
          </button>
        </div>
        {myPosts.map((post) => (
          <div
            key={post.id}
            className="book-card"
            onClick={() => {
              navigate(`/${post.id}`);
            }}
          >
            <div className="post-card" key={post.id}>
              <div className="card-content">
                <h2 className="post-title">{post.title}</h2>
                <div className="author-date">
                  <span className="author">
                    Author: {post.user.user.first_name}{" "}
                    {post.user.user.last_name}
                  </span>
                  <span className="date">{post.pub_date}</span>
                </div>
                <img className="post-image" src={post.image_url} alt="Post" />
              </div>
              <div className="card-footer">
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation(); //Prevents user from being navigated to post details page after click away from window alert
            handleDeletePost(post.id);
          }}
        >
          Delete
        </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
