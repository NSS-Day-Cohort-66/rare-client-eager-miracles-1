export const fetchCategories = async () => {
  const response = await fetch("http://localhost:8000/categories", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return response.json();
};

export const createCategory = async (newCategory) => {
  await fetch("http://localhost:8000/categories", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
};

export const editThisCategory = async (category) => {
  await fetch(`http://localhost:8000/categories/${category.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category)})
};

export const deleteCategory = (category) => {
  return fetch(`http://localhost:8000/categories/${category.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
};