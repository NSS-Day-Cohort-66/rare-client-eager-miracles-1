import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager";
import { createPostReaction } from "../../managers/PostReactionManager";
import { getAllReactions } from "../../managers/ReactionsManager";
import "./PostReactions.css";

export const PostReactions = () => {
  const [allReactions, setAllReactions] = useState([]);
  const [chosenPost, setChosenPost] = useState({});
  const { postId } = useParams();

  const fetchAndSetChosenPost = () => {
    getPostById(postId).then((postObj) => setChosenPost(postObj));
  };

  const fetchAndSetAllReactions = () => {
    getAllReactions().then((reactionsArray) => setAllReactions(reactionsArray));
  };

  const addReactionToPost = (reactionId) => {
    const postReactionObject = {
      post: chosenPost.id,
      reaction: reactionId,
    };
    createPostReaction(postReactionObject);
  };

  useEffect(() => {
    fetchAndSetChosenPost(postId);
    fetchAndSetAllReactions();
  }, [postId]);

  return (
    <div className="reactions-background-wrapper">
      <div className="reaction-buttons">
        {allReactions?.map((reaction) => (
          <button
            key={reaction.id}
            className="reaction-button"
            onClick={async () => {
              await addReactionToPost(reaction.id);
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
