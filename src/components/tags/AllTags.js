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
  const [updatedTag, setUpdatedTag] = useState({
      id: 0,
      label: "",
    })
  const manageTags = useRef()

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
      id: updatedTag.id,
      label: updatedTag.label,
    };
    editTag(tagCopy).then(() => {
      getAndSetTags();
    });
  };

  const handleManageTags = () => {
    if (manageTags.current) {
      manageTags.current.showModal()
    }
  }

  const handleCloseTags = () => {
    if (manageTags.current) {
      manageTags.current.close()
    }
  }

  const handleTagChange = (event, tag) => {
    const tagCopy = {
      id: tag.id,
      label: tag.label
    };
    tagCopy[event.target?.name] = event.target.value 
    setUpdatedTag(tagCopy)
  }

  return (
    <>
      <div className="tag-container">
        <div className="tag-title">Tag Manager!</div>
        <div className="tags-box">
          <div className="tag-area">
            {tags?.map((tag) => {
              return (
                  <li className="tag-label" key={tag.id}>
                    <button key={tag.id} type="button" className="modal-box" onClick={handleManageTags}>
                      <i className="settings-icon fas fa-book"></i>
                    </button>
                    <dialog className="manage-tags" ref={manageTags}>
                      <div className="tag-modal">
                          <input type="text"  name="label" placeholder="Update Tag Here" onChange={() => handleTagChange(tag)} />
                      </div>
                      <div>
                        <button className="save-button" onClick={updateTag}>Save Tag</button>
                        <button className="exit-button" onClick={handleCloseTags}>Cancel</button>
                      </div>
                    </dialog>
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

