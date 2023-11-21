import { useEffect, useState } from "react";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    let url = "http://localhost:8000/categories";

    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
    const catArray = await response.json();

    setCategories(catArray);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const displayCategories = () => {
    if (categories && categories.length) {
      return categories.map((cat) => (
        <div key={cat.id}>
          <div className="underline">{cat.label}</div>
        </div>
      ));
    }

    return <h3>Loading Categories...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Category List</h1>
      {displayCategories()}
    </>
  );
};
