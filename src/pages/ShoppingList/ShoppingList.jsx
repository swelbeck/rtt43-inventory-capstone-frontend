// ShoppingList.jsx

import { useContext, useEffect } from "react";
import { InventoryContext } from "../../contexts/InventoryContext";
import {
  toggleShoppingListStatus,
  updateItem,
} from "../../utilities/api/itemController.mjs";
import ACTIONS from "../../utilities/reducers/inventoryReducerActions.mjs";
import ShoppingListItem from "../../components/ShoppingListItem/ShoppingListItem";
import "./ShoppingList.css";

export default function ShoppingList() {
  const { inventory, dispatchInventory } = useContext(InventoryContext);

  // Filter items into Shopping List and Bought
  const shoppingList = inventory.filter(
    (item) => item.shoppingStatus === "shopping"
  );
  // console.log("Filtered shopping list:", shoppingList);
  const boughtItems = inventory.filter(
    (item) => item.shoppingStatus === "bought"
  );

  // Handle moving items between shopping and bought
  const moveItem = async (draggedItem, targetStatus) => {
    if (!draggedItem._id) {
      console.error("Dragged item missing _id:", draggedItem);
      return;
    }

    const updatedItem = await updateItem(draggedItem._id, {
      // This will change the item’s status to either "shopping" or "bought"
      shoppingStatus: targetStatus,
      purchaseDate: draggedItem.purchaseDate,
    });

    dispatchInventory({
      type: ACTIONS.TOGGLE_SHOPPING_STATUS,
      payload: updatedItem,
    });
  };

  // Handle toggling shopping status
  async function handleToggle(item) {
    try {
      const updatedItem = await updateItem(item._id, {
        shoppingStatus:
          item.shoppingStatus === "shopping" ? "bought" : "shopping",
      });

      // Dispatch the status change for updating `shoppingStatus`
      dispatchInventory({
        type: ACTIONS.TOGGLE_SHOPPING_STATUS,
        payload: updatedItem,
      });
    } catch (error) {
      console.error("Error toggling shopping list status:", error);
    }
  }

  async function handleRemoveFromShoppingList(item) {
    try {
      const updatedItem = await updateItem(item._id, {
        shoppingStatus: "None",
      });
      dispatchInventory({
        type: ACTIONS.TOGGLE_SHOPPING_STATUS,
        payload: updatedItem,
      });
    } catch (error) {
      console.error("Error removing item from shopping list:", error);
    }
  }

  async function handleSave(editedItem) {
    try {
      // Only update the backend for "bought" items
      if (editedItem.shoppingStatus === "bought") {
        const updatedItem = await updateItem(editedItem._id, editedItem);
        dispatchInventory({ type: ACTIONS.EDIT_ITEM, payload: updatedItem });
      } else {
        // For "shopping" items, just update the local state
        dispatchInventory({ type: ACTIONS.EDIT_ITEM, payload: editedItem });
      }

      if (editedItem.addedToShoppingList) {
        dispatchInventory({
          type: ACTIONS.ADD_ITEM_TO_SHOPPING_LIST,
          payload: editedItem,
        });
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  }

  return (
    <div className="shopping-list-container">
      <div className="shopping-list-title">
        <h2>Shopping List</h2>
      </div>

      <div className="shopping-list">
        <div className="category">
          <h3>Shopping</h3>
          <ul>
            {shoppingList.map((item) => (
              <ShoppingListItem
                key={item._id}
                item={item}
                moveItem={moveItem}
                status="shopping"
                onSave={handleSave}
                onToggle={handleToggle}
                onRemove={handleRemoveFromShoppingList}
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
                moveItem={moveItem}
                status="bought"
                onSave={handleSave}
                onToggle={handleToggle}
                onRemove={handleRemoveFromShoppingList}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
