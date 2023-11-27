import { useState, useEffect} from "react"
import "./PostList.css"
import { useNavigate } from "react-router-dom"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])
    const navigate = useNavigate()

    const fetchAllPosts = async () => {
        const response = await fetch('http://localhost:8000/posts', {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
},
        })
        const posts = await response.json()
        const approvedPosts = posts
        .filter((post) => post.approved === true)
        .sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
      setAllPosts(approvedPosts);
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])


    const btnToCreate = () => {
        navigate('/create');
    };

    const deletePost = (post) => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
        });
      };

      const handleDeletePost = (post) => {
        deletePost(post).then(() => {
          fetchAllPosts()
        })
      }
    
      
    return (
        <div className="background-wrapper">
            <div className="container">
            <div className="header-container">
            <h1 className="post-header">Posts</h1>
            <button type="button" className="settings-button" onClick={btnToCreate}>
                <i className="settings-icon fas fa-plus"></i>
            </button>
        </div>
                {allPosts.map((post) => (
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
                                        Author: {post.user.user.first_name} {post.user.user.last_name}
                                    </span>
                                    <span className="date">{post.pub_date}</span>
                                </div>
                                <img className="post-image" src={post.image_url} alt="Post" />
                            </div>
                            <div className="card-footer">
                                <button className="reactions">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}    