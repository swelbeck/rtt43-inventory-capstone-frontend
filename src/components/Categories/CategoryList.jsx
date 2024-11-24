import { useState } from "react";

export default function CategoryList({ categories, onDelete, onEdit }) {
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  function handleEditChange(e) {
    setNewCategoryName(e.target.value); // Update input value for the category name
  }

  function handleSaveEdit(categoryId) {
    onEdit(categoryId, newCategoryName); // Pass updated category name to the onEdit function
    setEditingCategoryId(null); // Exit editing mode
    setNewCategoryName(""); // Clear input field
  }

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat._id}>
          {editingCategoryId === cat._id ? (
            <div>
              <input
                type="text"
                value={newCategoryName}
                onChange={handleEditChange}
                placeholder="Edit Category Name"
              />
              <button onClick={() => handleSaveEdit(cat._id)}>Save</button>
            </div>
          ) : (
            <div>
              {cat.name}
              {/* Only show buttons for user-created categories (not default ones) */}
              {cat.createdBy !== "system" && (
                <>
                  <button onClick={() => onDelete(cat._id)}>Delete</button>
                  <button
                    onClick={() => {
                      setEditingCategoryId(cat._id); // Set the category being edited
                      setNewCategoryName(cat.name); // Pre-fill input with current name
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
              {cat.createdBy === "system" && <span> (Default Category) </span>}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
