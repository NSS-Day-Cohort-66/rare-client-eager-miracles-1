import { useEffect, useState} from "react";
import "./CreatePost.css"
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../../managers/PostManager";


export const CreatePostForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [newItem, setNewItem] = useState({
        title: "",
        content: "",
        image_url: "",
        category: 0
    })

    const fetchCategories = async() => {
        let url = "http://localhost:8000/categories";
        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
              },
        })
        const catData = await response.json()
        setCategories(catData)
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    

    const handleInputChange = (e) => {
        const itemCopy = { ...newItem };
        itemCopy[e.target.name] = e.target.value;
        setNewItem(itemCopy);
      };
    
      const handleInputChangeCategory = (e) => {
        const itemCopy = { ...newItem };
        itemCopy[e.target.name] = parseInt(e.target.value);
        setNewItem(itemCopy);
      };


      const handleSubmit = async (event) => {
        event.preventDefault();
        await createNewPost(newItem); 
        navigate('/');
    };

    return (
        <div className="create-post-container">
            <h1 className="create-post-heading">Create Post</h1>
            <form className="create-post-form">
                {/* Input for Title */}
                <div>
                    <label htmlFor="title" className="create-post-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="create-post-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Input for Content */}
                <div>
                    <label htmlFor="content" className="create-post-label">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        className="create-post-input-content"
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                {/* Input for Category */}
                <div className="new-category">Category</div>
                <select
                    name="category"
                    value={categories.id}
                    onChange={handleInputChangeCategory}
                    className="create-post-input"
                >
                    <option value={0}>Please select a category</option>
                    {categories.map((catObj) => {
                    return (
                        <option key={catObj.id} value={catObj.id}>
                        {catObj.label}
                        </option>
                    );
                    })}
                </select>
                {/* Input for Header Image URL */}
                <div>
                    <label htmlFor="image_url" className="create-post-label">Header Image URL</label>
                    <input
                        type="url"
                        id="image_url"
                        name="image_url"
                        className="create-post-input create-post-url-input"
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit button to create the post */}
                <button type="submit" className="create-post-button" onClick={handleSubmit}>Create Post</button>
            </form>
        </div>
    );
}