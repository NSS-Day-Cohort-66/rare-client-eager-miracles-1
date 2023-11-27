import { useEffect, useState } from "react";
import "./PostReactions.css";
import { useParams } from "react-router-dom";

export const PostReactions = () => {
  const [allReactions, setAllReactions] = useState([]);
  const [chosenPost, setChosenPost] = useState({});
  const { postId } = useParams();

  const getPostById = async () => {
    let url = `http://localhost:8000/posts/${postId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
    const post = await response.json();
    setChosenPost(post);
  };

  const fetchAndSetAllReactions = async () => {
    const response = await fetch("http://localhost:8000/reactions", {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
    const reactions = await response.json();
    setAllReactions(reactions);
  };

  useEffect(() => {
    getPostById().then(fetchAndSetAllReactions());
  }, []);

  const addPostReaction = async (reactionId) => {
    const postReactionObject = {
      post: chosenPost.id,
      reaction: reactionId,
    };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(postReactionObject),
    };

    const response = await fetch(
      `http://localhost:8000/postreactions`,
      postOptions
    );
  };

  return (
    <div className="background-wrapper">
      <div className="reaction-buttons">
        {allReactions?.map((reaction) => (
          <button
            key={reaction.id}
            className="reaction-button"
            onClick={async () => {
              await addPostReaction(reaction.id);
              getPostById();
            }}
          >
            <img
              className="reaction-image"
              alt="Reaction"
              src={reaction.image_url}
            ></img>
            <span>
              {chosenPost.reactions_count
                ? chosenPost.reactions_count[reaction.id - 1].count
                : 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
