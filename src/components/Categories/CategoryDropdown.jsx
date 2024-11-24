import { useState, useEffect } from "react";
import {
  getAllCategories,
  createCategory,
} from "../../utilities/categoryController.mjs";

export default function CategoryDropdown({
  selectedCategory,
  onCategoryChange,
}) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    }
    fetchCategories();
  }, []);

  async function handleAddCategory(e) {
    e.preventDefault();
    const addedCategory = await createCategory({ name: newCategory });
    setCategories((prev) => [...prev, addedCategory]);
    setNewCategory("");
    setIsAdding(false);
  }

  return (
    <div>
      <select value={selectedCategory} onChange={onCategoryChange}>
        <option value="">Select a Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
        <option value="add-new">Add New Category</option>
      </select>
      {isAdding && (
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
          />
          <button type="submit">Add</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
}
