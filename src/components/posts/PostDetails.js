import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetail.css";
import { PostReactions } from "./PostReactions";
import { getPostById } from "../../managers/PostManager";

export const PostDetail = () => {
  const [chosenPost, setChosenPost] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then(setChosenPost);
  }, [postId]);


  return (
    <div className="background-wrapper">
      <div className="container">
        <div className="post-card" key={chosenPost.id}>
          <div className="card-header">
            <div className="settings-notification"></div>
            <div className="post-title-section">
              <h2 className="post-title">{chosenPost.title}</h2>
            </div>
          </div>
          <img className="post-image" src={chosenPost.image_url} alt="Post" />
          <div className="author-comments">
            <button className="comments-button">View Comments</button>
          </div>
          <p className="post-content">{chosenPost.content}</p>
          <div className="card-footer">
            <PostReactions chosenPost={chosenPost} />
          </div>
        </div>
      </div>
    </div>
  );
};
