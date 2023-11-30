import "./Tags.css";
import { useEffect, useRef, useState } from "react";
import {
  deleteTag,
  editTag,
  fetchAndSetTags,
  postNewTag,
} from "../../managers/TagManagaer";

export const AllTags = () => {
  const [tags, setTags] = useState([]);
  const [newItem, setNewItem] = useState({
    label: "",
  });
  const [updatedTag, setUpdatedTag] = useState({});
  const [editTagLabel, setEditTagLabel] = useState({})
  const manageTags = useRef();

  const getAndSetTags = async () => {
    const tagArray = await fetchAndSetTags();
    setTags(tagArray);
  };

  useEffect(() => {
    getAndSetTags();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTag = {
      label: newItem.label,
    };
    postNewTag(newTag).then(() => {
      getAndSetTags();
    });
  };

  const handleDelete = (tag) => {
    deleteTag(tag).then(() => {
      getAndSetTags();
    });
  };

  const handleInputChange = (e) => {
    const itemCopy = { ...newItem };
    itemCopy[e.target.name] = e.target.value;
    setNewItem(itemCopy);
  };

  const updateTag = async (event) => {
    event.preventDefault();
    const tagCopy = {
      id: editTagLabel.id,
      label: editTagLabel.label,
    };
    await editTag(tagCopy).then(() => {
      getAndSetTags();
      handleCloseTags();
      setEditTagLabel("")
    });
  };

  const handleManageTags = () => {
    if (manageTags.current) {
      manageTags.current.showModal();
    }
  };

  const handleCloseTags = () => {
    if (manageTags.current) {
      manageTags.current.close();
    }
  };

  const handleTagChange = (event) => {
    const tagCopy = { ...tags };
    tagCopy[event.target.name] = event.target.value;
    setUpdatedTag(tagCopy);
  };

  return (
    <>
      <dialog className="manage-tags" ref={manageTags}>
        <div className="tag-modal">
          <fieldset>
          <input
          className="input-text"
            onChange={(event) => {
              const tagCopy = { ...editTagLabel };
              tagCopy.label = event.target.value;
              setEditTagLabel(tagCopy);
            }}
          />
          </fieldset>
        </div>
        <div>
          <button className="save-button" onClick={(event) => {
                updateTag(event)}}>
            Save Tag
          </button>
          <button className="exit-button" onClick={handleCloseTags}>
            Cancel
          </button>
        </div>
      </dialog>

      <div className="tag-container">
        <div className="tag-title">Tag Manager!</div>
        <div className="tags-box">
          <div className="tag-area">
            {tags?.map((tag) => {
              return (
                <div>
                  <li className="tag-label" key={tag.id}>
                    <button
                      type="button"
                      className="modal-box"
                      onClick={() => {setEditTagLabel(tag); handleManageTags()}}
                    >
                      <i className="settings-icon fas fa-book"></i>
                    </button>

                    <button
                      type="button"
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
