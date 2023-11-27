import { useEffect, useState } from "react";
import "./CreatePost.css"



export const CreatePostForm = () => {
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image_url: "",
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
    
    

    return (
        <div className="create-post-container">
            <h1 className="create-post-heading">Create Post</h1>
            <form className="create-post-form">
                {/* Input for Title */}
                <div>
                    <label htmlFor="title" className="create-post-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="create-post-input"
                        required
                    />
                </div>

                {/* Input for Content */}
                <div>
                    <label htmlFor="content" className="create-post-label">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        className="create-post-input"
                        required
                    ></textarea>
                </div>

                {/* Input for Category */}
                <div className="new-category">Category:</div>
          <select
            name="categoryId"
            value={categories.id}
            className="category-dropdown"
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
                    <label htmlFor="imageUrl" className="create-post-label">Header Image URL (optional):</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        className="create-post-input create-post-url-input"
                    />
                </div>

                {/* Submit button to create the post */}
                <button type="submit" className="create-post-button">Create Post</button>
            </form>
        </div>
    );
}