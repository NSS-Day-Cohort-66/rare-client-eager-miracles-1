import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryList.css";

export const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const initialCatState = {
    label: "",
  };
  const [category, updateCategory] = useState(initialCatState);

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const fetchAndSetCategories = async () => {
    let url = "http://localhost:8000/categories";

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
    const catArray = await response.json();

    setCategories(catArray);
  };

  const createCategory = async (evt) => {
    await fetch("http://localhost:8000/categories", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
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
          <button onClick={createCategory} className="button">
            Create
          </button>
        </div>
      </div>
    </>
  );
};
