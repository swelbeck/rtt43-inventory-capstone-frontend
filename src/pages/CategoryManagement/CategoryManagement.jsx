import { useState, useEffect, useContext } from "react";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../utilities/api/categoryController.mjs";
import { InventoryContext } from "../../contexts/InventoryContext";
import CategoryForm from "../../components/Categories/CategoryForm";
import CategoryList from "../../components/Categories/CategoryList";
import ACTIONS from "../../utilities/reducers/inventoryReducerActions.mjs";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const { dispatch } = useContext(InventoryContext); // Get dispatch from context

  useEffect(() => {
    async function fetchCategories() {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    }
    fetchCategories();
  }, []);

  async function handleAddCategory(categoryName) {
    try {
      const addedCategory = await createCategory({ name: categoryName });
      if (addedCategory && addedCategory.newCategory) {
        setCategories((prev) => [...prev, addedCategory.newCategory]); // Add the new category
      }
    } catch (error) {
      console.error("Error adding new category:", error);
    }
  }

  async function handleDeleteCategory(categoryId) {
    await deleteCategory(categoryId);

    // Dispatch action to update inventory items that were using this category
    dispatch({
      type: ACTIONS.UPDATE_CATEGORY,
      payload: {
        _id: categoryId,
        name: "Uncategorized",
      },
    });

    setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
  }

  async function handleEditCategory(categoryId, categoryName) {
    const updatedCategory = await updateCategory(categoryId, {
      name: categoryName,
    });

    // Dispatch action to update category name in inventory
    dispatch({
      type: ACTIONS.UPDATE_CATEGORY,
      payload: updatedCategory,
    });

    setCategories((prev) =>
      prev.map((cat) => (cat._id === categoryId ? updatedCategory : cat))
    );
    setEditingCategoryId(null);
  }

  return (
    <div>
      <h2>Manage Categories</h2>
      <CategoryForm
        onSubmit={handleAddCategory}
        categoryToEdit={
          editingCategoryId
            ? categories.find((cat) => cat._id === editingCategoryId)
            : null
        }
      />
      <CategoryList
        categories={categories}
        onDelete={handleDeleteCategory}
        onEdit={handleEditCategory}
      />
    </div>
  );
}
