import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./PostDetail.css"


export const PostDetail = () => {
    const [chosenPost, setChosenPost] = useState([])
    const {postId} = useParams()
    const navigate = useNavigate()


    const getPostById = async () => {
        let url = `http://localhost:8000/posts/${postId}`
        const response = await fetch(url, {
            headers: {
              Authorization: `Token ${
                (localStorage.getItem("auth_token"))
              }`,
            },
          });
          const post = await response.json();
          setChosenPost(post);
    }


    useEffect(() => {
        getPostById();
      }, []);

      return (
        <div className="background-wrapper">
            <div className="container">
                <div className="post-card" key={chosenPost.id}>
                    <div className="card-header">
                        <div className="settings-notification">
                        </div>
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
                        <div className="reactions">
                        <i className="settings-icon fas fa-smile"></i>
                        <i className="settings-icon fas fa-frown"></i>
                        <i className="settings-icon fas fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
      }    