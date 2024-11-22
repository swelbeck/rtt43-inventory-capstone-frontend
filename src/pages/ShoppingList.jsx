import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import {
  toggleShoppingListStatus,
  deleteItem,
} from "../utilities/itemController.mjs";
import ACTIONS from "../utilities/inventoryReducerActions.mjs";

export default function ShoppingList() {
  const { inventory, dispatch } = useContext(InventoryContext);

  // Group items by category
  const shoppingList = inventory.filter(
    (item) => item.addedToShoppingList && item.shoppingStatus === "shopping"
  );
  const boughtItems = inventory.filter(
    (item) => item.shoppingStatus === "bought"
  );

  const categories = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  async function handleToggle(item) {
    try {
      const updatedItem = await toggleShoppingListStatus(item._id);
      dispatch({ type: ACTIONS.TOGGLE_SHOPPING_STATUS, payload: updatedItem });
    } catch (error) {
      console.error("Error toggling shopping list status:", error);
    }
  }

  async function handleDelete(item) {
    try {
      const success = await deleteItem(item._id);
      if (success) {
        dispatch({ type: ACTIONS.DELETE_ITEM, payload: item._id });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>

      <div className="category">
        <h3>Shopping List</h3>
        <ul>
          {shoppingList.map((item) => (
            <li key={item._id}>
              <input
                type="checkbox"
                checked={item.shoppingStatus === "bought"}
                onChange={() => handleToggle(item)}
              />
              {item.name} (Quantity: {item.quantity})
            </li>
          ))}
        </ul>
      </div>

      <div className="category">
        <h3>Bought</h3>
        <ul>
          {boughtItems.map((item) => (
            <li key={item._id}>
              {item.name} (Quantity: {item.quantity}) - Bought
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
