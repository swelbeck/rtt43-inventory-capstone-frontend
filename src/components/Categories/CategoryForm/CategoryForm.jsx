import { useState, useEffect } from "react";
import "./CategoryForm.css";

export default function CategoryForm({
  onSubmit,
  categoryToEdit,
  existingCategories,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    console.log(categoryToEdit);
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name);
    }
  }, [categoryToEdit]);

  function handleSubmit(e) {
    e.preventDefault();

    // Normalize the category name for case-insensitive comparison
    const normalizedCategoryName = categoryName.toLowerCase().trim();

    // Check if the category already exists in the list of existing categories
    let duplicateCategory = false;
    for (let i = 0; i < existingCategories.length; i++) {
      if (
        existingCategories[i].name.toLowerCase().trim() ===
        normalizedCategoryName
      ) {
        duplicateCategory = true;
        break; // Exit the loop if a duplicate is found
      }
    }

    if (duplicateCategory) {
      setIsDuplicate(true);
      return; // Prevent form submission if duplicate is found
    } else {
      setIsDuplicate(false);
    }

    // If no duplicate, submit the category name
    onSubmit(categoryName);
    setCategoryName(""); // Clear input after submission
  }

  return (
    <form onSubmit={handleSubmit}>
      {isDuplicate && (
        <p style={{ color: "red" }}>This category already exists.</p>
      )}
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
