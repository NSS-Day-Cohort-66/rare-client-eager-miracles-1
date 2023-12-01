import { useEffect, useRef, useState } from "react";
import "./CategoryList.css";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  editThisCategory,
} from "../../managers/CatManager";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const initialCatState = {
    label: "",
  };
  const [category, updateCategory] = useState(initialCatState);
  const [editCategory, setEditCategory] = useState({});
  const manageCategory = useRef();

  const fetchAndSetCategories = async () => {
    const catArray = await fetchCategories();
    setCategories(catArray);
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const createAndRefreshCategories = async () => {
    await createCategory(category);
    fetchAndSetCategories();
  };

  const updateThisCategory = async (event) => {
    event.preventDefault();
    const catCopy = {
      id: editCategory.id,
      label: editCategory.label,
    };
    await editThisCategory(catCopy).then(() => {
      fetchAndSetCategories();
      handleCloseCategory();
      setEditCategory("")
    });
  }

  const handleManageCat = () => {
    if (manageCategory.current) {
      manageCategory.current.showModal();
    }
  };

  const handleCloseCategory = () => {
    if (manageCategory.current) {
      manageCategory.current.close();
    }
  };

  const handleDelete = (cat) => {
    deleteCategory(cat).then(() => {
      fetchAndSetCategories();
    });
  };

  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((cat) => {
        return(
        <div key={cat.id}>
          <button
            type="button"
            className="modal-box"
            onClick={() => {
              setEditCategory(cat);
              handleManageCat();
            }}
          >
            <i className="settings-icon fas fa-book"></i>
          </button>

          <button
            type="button"
            onClick={() => {
              handleDelete(cat);
            }}
          >
            <i className="settings-icon fas fa-trash"></i>
          </button>
          <div className="cat-item">{cat.label}</div>
        </div>
      )});
    }

    return <h3>Loading Categories...</h3>;
  };

  return (
    <>
          <dialog className="manage-tags" ref={manageCategory}>
        <div className="tag-modal">
          <fieldset>
          <input
          className="input-text"
            onChange={(event) => {
              const tagCopy = { ...editCategory };
              tagCopy.label = event.target.value;
              setEditCategory(tagCopy);
            }}
          />
          </fieldset>
        </div>
        <div>
          <button className="save-button" onClick={(event) => {
                updateThisCategory(event)}}>
            Save Tag
          </button>
          <button className="exit-button" onClick={handleCloseCategory}>
            Cancel
          </button>
        </div>
      </dialog>

      <div className="comp-container">
        <div className="categories">
          <span className="header">Categories</span>
          <div className="cat-list">{displayCategories()}</div>
        </div>
        <div className="cat-form">
          <h1 className="header">Create a new Category</h1>
          <fieldset className="mt-4">
            <input
              placeholder="Category Name"
              id="label"
              type="text"
              onChange={(e) => {
                const copy = { ...category };
                copy.label = e.target.value;
                updateCategory(copy);
              }}
              value={category.label}
              className="cat-input"
            />
          </fieldset>
          <button onClick={createAndRefreshCategories} className="button">
            Create
          </button>
        </div>
      </div>
    </>
  );
};
