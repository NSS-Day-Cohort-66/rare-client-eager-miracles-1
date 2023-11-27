import { useNavigate } from "react-router-dom";
import "./Tags.css";
import { useEffect, useState } from "react";
import { deleteTag } from "../../managers/TagManagaer";

export const AllTags = () => {
  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState({
    label: "",
  });

  const fetchAndSetTags = async () => {
    let url = "http://localhost:8000/tags";

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
    const tagArray = await response.json();
    setTags(tagArray);
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
    fetchAndSetTags();
    
  };

  const handleDelete = (tag) => {
    deleteTag(tag).then(() => {
      fetchAndSetTags()
    })
  }

  const handleInputChange = (e) => {
    const itemCopy = { ...newItem };
    itemCopy[e.target.name] = e.target.value;
    setNewItem(itemCopy);
  };

  useEffect(() => {
    fetchAndSetTags();
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
                    <button type="button" className="modal-box" onClick={() => {handleDelete(tag)}}>
                      <i className="settings-icon fas fa-trash"></i>
                    </button>
                    {tag.label}
                  </li>
                </div>
              );
            })}
          </div>
          <div className="tag-add">
            <div className="tag-title">Would you like to add another Tag?!</div>
            <div>
              <fieldset>
                <input
                  name="label"
                  type="text"
                  className="tag-input"
                  required
                  placeholder="Add a tag here"
                  onChange={handleInputChange}
                />
              </fieldset>

              <button className="button" onClick={postNewTag}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
