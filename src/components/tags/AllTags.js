import { useNavigate } from "react-router-dom";
import "./Tags.css";
import { useEffect, useState } from "react";

export const AllTags = () => {
  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState({
    label: "",
  });
  const navigate = useNavigate();

  const getAllTags = async() => {
    return await fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    }).then((res) => res.json());
  };

  const postNewTag = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    await getAllTags()
    navigate("/tags")
  };
  const handleInputChange = (e) => {
    const itemCopy = { ...newItem };
    itemCopy[e.target.name] = e.target.value;
    setNewItem(itemCopy);
  };

  useEffect(() => {
    getAllTags().then((tagsArray) => {
      setTags(tagsArray);
    });
  }, []);

  return (
    <>
      <div className="tag-container">
        <div className="tag-title">Tag Manager!</div>
        <div className="tags-box">
          <div className="tag-area">
            {tags.map((tag) => {
              return (
                <div key={tag.id}>
                  <li className="tag-label">
                    <button type="button" className="modal-box">
                      <i className="settings-icon fas fa-book"></i>
                    </button>
                    <button type="button" className="modal-box">
                      <i className="settings-icon fas fa-trash"></i>
                    </button>
                    {tag.label}
                  </li>
                </div>
              );
            })}
          </div>
          <form className="tag-add">
            <div className="tag-title">Would you like to add another Tag?!</div>
            <div>
              <input
                name="label"
                type="text"
                className="tag-input"
                required
                placeholder="Add a tag here"
                onChange={handleInputChange}
              />
              <button className="submit-btn" onClick={postNewTag}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
