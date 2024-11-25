import { useContext, useEffect } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import {
  toggleShoppingListStatus,
  getInventory,
  deleteItem,
  updateItem,
} from "../utilities/api/itemController.mjs";
import ACTIONS from "../utilities/reducers/inventoryReducerActions.mjs";
import ShoppingListItem from "../components/ShoppingList/ShoppingListItem";

export default function ShoppingList() {
  const { inventory, dispatch } = useContext(InventoryContext);
  useEffect(() => {
    console.log("Inventory updated:", inventory);
  }, [inventory]);

  // Filter items into Shopping List and Bought
  const shoppingList = inventory.filter(
    (item) => item.shoppingStatus === "shopping"
  );
  console.log("Filtered shopping list:", shoppingList);
  const boughtItems = inventory.filter(
    (item) => item.shoppingStatus === "bought"
  );

  async function handleToggle(item) {
    try {
      const updatedItem = await toggleShoppingListStatus(item._id);

      // Dispatch the status change for updating `shoppingStatus`
      dispatch({
        type: ACTIONS.TOGGLE_SHOPPING_STATUS,
        payload: updatedItem,
      });

      // If the item is marked as "shopping", set addedToShoppingList to true
      if (updatedItem.shoppingStatus === "shopping") {
        dispatch({
          type: ACTIONS.ADD_ITEM_TO_SHOPPING_LIST,
          payload: updatedItem,
        });
      } else {
        // If the item is marked as "bought", set addedToShoppingList to false
        dispatch({
          type: ACTIONS.DELETE_ITEM_FROM_SHOPPING_LIST,
          payload: updatedItem._id,
        });
      }
    } catch (error) {
      console.error("Error toggling shopping list status:", error);
    }
  }

  async function handleRemoveFromShoppingList(item) {
    try {
      const updatedItem = await toggleShoppingListStatus(item._id);

      // Dispatch action to remove the item from the shopping list
      dispatch({
        type: ACTIONS.DELETE_ITEM_FROM_SHOPPING_LIST,
        payload: updatedItem._id,
      });
    } catch (error) {
      console.error("Error removing item from shopping list:", error);
    }
  }

  async function handleSave(editedItem) {
    try {
      const updatedItem = await updateItem(editedItem._id, editedItem);
      if (success) {
        dispatch({ type: ACTIONS.EDIT_ITEM, payload: updatedItem });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function handleDelete(item) {
    console.log(item);
    try {
      // Update Shopping Status to "None" in backend
      const updatedItem = await updateItem(item._id, {
        shoppingStatus: "None",
      });

      dispatch({
        type: ACTIONS.DELETE_ITEM_FROM_SHOPPING_LIST,
        payload: item._id,
      });

      const updatedInventory = await getInventory();
      dispatch({ type: ACTIONS.SET_INVENTORY, payload: updatedInventory });
    } catch (error) {
      console.error("Error deleting item from shopping list:", error);
    }
  }

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>

      <div className="category">
        <h3>Shopping</h3>
        <ul>
          {shoppingList.map((item) => (
            <ShoppingListItem
              key={item._id}
              item={item}
              onSave={handleSave}
              onToggle={handleToggle}
              onRemove={handleRemoveFromShoppingList}
              // onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>

      <div className="category">
        <h3>Bought</h3>
        <ul>
          {boughtItems.map((item) => (
            <ShoppingListItem
              key={item._id}
              item={item}
              onSave={handleSave}
              onToggle={handleToggle}
              onRemove={handleRemoveFromShoppingList}
              // onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
