import "./Tags.css";
import { useEffect, useState } from "react";
import {
  deleteTag,
  fetchAndSetTags,
  postNewTag,
} from "../../managers/TagManagaer";

export const AllTags = () => {
  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState({
    label: "",
  });
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    fetchAndSetTags().then((tagsArray) => {
      setTags(tagsArray);
    });
  }, [rerender]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTag = {
      label: newItem.label,
    };
    postNewTag(newTag).then(() => {
      setRerender(!rerender)
    });
  };

  const handleDelete = (tag) => {
    deleteTag(tag).then(() => {
      setRerender(!rerender)
    });
  };

  const handleInputChange = (e) => {
    const itemCopy = { ...newItem };
    itemCopy[e.target.name] = e.target.value;
    setNewItem(itemCopy);
  };

  return (
    <>
      <div className="tag-container">
        <div className="tag-title">Tag Manager!</div>
        <div className="tags-box">
          <div className="tag-area">
            {tags?.map((tag) => {
              return (
                <div key={tag.id}>
                  <li className="tag-label">
                    <button type="button" className="modal-box">
                      <i className="settings-icon fas fa-book"></i>
                    </button>
                    <button
                      type="button"
                      className="modal-box"
                      onClick={() => {
                        handleDelete(tag);
                      }}
                    >
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

              <button className="button" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
