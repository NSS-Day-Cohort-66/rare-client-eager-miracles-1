import { useState, useEffect} from "react"
import "./PostList.css"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])


    const fetchAllPosts = async () => {
        const response = await fetch('http://localhost:8000/posts', {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
},
        })
        const posts = await response.json()
        setAllPosts(posts)
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])

    return (
        <div className="background-wrapper">
            <div className="container">
                <h1 className="post-header">Posts</h1>
                {allPosts.map((post) => (
                    <div className="post-card" key={post.id}>
                        <div className="card-content">
                            <h2 className="post-title">{post.title}</h2>
                            <div className="author-date">
                                <span className="author">Author: {post.user.user.first_name} {post.user.user.last_name}</span>
                                <span className="date">{post.pub_date}</span>
                            </div>
                            <img className="post-image" src={post.image_url} alt="Post" />
                        </div>
                        <div className="card-footer">
                            <span className="reactions">{post.reaction_count} reaction count</span>
                            <div className="card-actions">

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
                }    