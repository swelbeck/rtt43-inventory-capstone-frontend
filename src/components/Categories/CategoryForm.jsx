import { useState, useEffect } from "react";
import "./CategoryForm.css";

export default function CategoryForm({ onSubmit, categoryToEdit }) {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    console.log(categoryToEdit);
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name);
    }
  }, [categoryToEdit]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(categoryName);

    setCategoryName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
      />
      <button type="submit">{categoryToEdit ? "Save" : "Add Category"}</button>
    </form>
  );
}
