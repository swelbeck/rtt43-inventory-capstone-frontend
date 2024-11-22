import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import {
  toggleShoppingListStatus,
  deleteItem,
} from "../utilities/itemController.mjs";

export default function ShoppingList() {
  const { inventory, dispatch } = useContext(InventoryContext);

  // Group items by category
  const shoppingList = inventory.filter((item) => item.addedToShoppingList);
  const categories = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  async function handleToggle(item) {
    try {
      const updatedItem = await toggleShoppingListStatus(item._id);
      dispatch({ type: "UPDATE_ITEM", payload: updatedItem });
    } catch (error) {
      console.error("Error toggling shopping list status:", error);
    }
  }

  async function handleDelete(item) {
    try {
      const success = await deleteItem(item._id);
      if (success) {
        dispatch({ type: "DELETE_ITEM", payload: item._id });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      {Object.keys(categories).length > 0 ? (
        <div className="categories">
          {Object.entries(categories).map(([category, items]) => (
            <div className="category" key={category}>
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item._id}>
                    <input
                      type="checkbox"
                      checked={item.addedToShoppingList}
                      onChange={() => handleToggle(item)}
                    />
                    {item.name} (Quantity: {item.quantity})
                    <button onClick={() => handleDelete(item)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in shopping list</p>
      )}
    </div>
  );
}
