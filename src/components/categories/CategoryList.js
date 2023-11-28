import { useEffect, useState } from "react";
import "./CategoryList.css";
import { fetchCategories, createCategory } from "../../managers/CatManager";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const initialCatState = {
    label: "",
  };
  const [category, updateCategory] = useState(initialCatState);

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

  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((cat) => (
        <div key={cat.id}>
          <div className="cat-item">{cat.label}</div>
        </div>
      ));
    }

    return <h3>Loading Categories...</h3>;
  };

  return (
    <>
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
