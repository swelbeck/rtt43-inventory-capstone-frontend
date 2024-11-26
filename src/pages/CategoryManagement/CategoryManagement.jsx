// CategoryManagement.jsx

import { useState, useEffect, useContext } from "react";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  deleteCategoryAndUpdate,
  updateCategory,
} from "../../utilities/api/categoryController.mjs";
import { InventoryContext } from "../../contexts/InventoryContext";
import CategoryForm from "../../components/Categories/CategoryForm/CategoryForm";
import CategoryList from "../../components/Categories/CategoryList/CategoryList";
import ACTIONS from "../../utilities/reducers/inventoryReducerActions.mjs";
import "./CategoryManagement.css";

export default function CategoryManagement() {
  const { categories, dispatchCategories } = useContext(InventoryContext);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const { dispatchInventory } = useContext(InventoryContext);

  useEffect(() => {
    async function fetchCategories() {
      const allCategories = await getAllCategories();
      dispatchCategories({
        type: ACTIONS.SET_CATEGORIES,
        payload: allCategories,
      });
    }
    fetchCategories();
  }, [dispatchCategories]);

  async function handleAddCategory(categoryName) {
    console.log("Adding category:", categoryName); 
    try {
      const addedCategory = await createCategory({ name: categoryName });
      if (addedCategory && addedCategory.newCategory) {
        dispatchCategories({
          type: ACTIONS.ADD_CATEGORY,
          payload: addedCategory.newCategory,
        });
      }
    } catch (error) {
      console.error("Error adding new category:", error);
    }
  }

  async function handleDeleteCategory(categoryId) {
    try {
      // Call backend to delete category and update items
      await deleteCategoryAndUpdate(categoryId);

      // Dispatch action to remove the category from the frontend
      dispatchCategories({
        type: ACTIONS.DELETE_CATEGORY,
        payload: categoryId,
      });

      // Dispatch action to update all items using this category to "uncategorized"
      dispatchInventory({
        type: ACTIONS.UPDATE_CATEGORY,
        payload: {
          _id: categoryId,
          name: "uncategorized", // Set items' category to "uncategorized"
        },
      });

      // getAllCategories(); // to ensure UI stays in sync
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  async function handleEditCategory(categoryId, categoryName) {
    const updatedCategory = await updateCategory(categoryId, {
      name: categoryName,
    });
    dispatchCategories({
      type: ACTIONS.UPDATE_CATEGORY,
      payload: updatedCategory,
    });
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
        existingCategories={categories}
      />
      <CategoryList
        categories={categories}
        onDelete={handleDeleteCategory}
        onEdit={handleEditCategory}
      />
    </div>
  );
}
