import "./CreatePost.css"



export const CreatePostForm = () => {
    

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
                <div>
                    <label htmlFor="category" className="create-post-label">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        className="create-post-input"
                        required
                    />
                </div>

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