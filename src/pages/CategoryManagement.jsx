import { useState, useEffect } from "react";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../utilities/categoryController.mjs";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    }
    fetchCategories();
  }, []);

  async function handleAddCategory() {
    const addedCategory = await createCategory({ name: newCategory });
    setCategories((prev) => [...prev, addedCategory]);
    setNewCategory("");
  }

  async function handleDeleteCategory(id) {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
  }

  return (
    <div>
      <h2>Manage Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name}
            <button onClick={() => handleDeleteCategory(cat._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category Name"
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
}
