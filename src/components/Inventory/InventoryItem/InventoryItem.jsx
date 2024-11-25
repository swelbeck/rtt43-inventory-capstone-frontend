import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../../../contexts/InventoryContext.jsx";
import ACTIONS from "../../../utilities/reducers/inventoryReducerActions.mjs";
import {
  toggleShoppingListStatus,
  deleteItem,
} from "../../../utilities/api/itemController.mjs";

export default function InventoryItem({ item }) {
  const { dispatch } = useContext(InventoryContext);

  async function handleAddToShoppingList() {
    try {
      const updatedItem = await toggleShoppingListStatus(item._id);
      dispatch({ type: ACTIONS.TOGGLE_SHOPPING_STATUS, payload: updatedItem });
    } catch (error) {
      console.error("Error updating shopping list status:", error);
    }
  }

  async function handleRemoveFromShoppingList() {
    try {
      const updatedItem = await toggleShoppingListStatus(item._id);

      dispatch({
        type: ACTIONS.DELETE_ITEM_FROM_SHOPPING_LIST,
        payload: updatedItem._id,
      });

      // // Optionally update inventory state if needed 
      // dispatch({
      //   type: ACTIONS.SET_INVENTORY,
      //   payload: updatedInventory, // Only if you need to sync inventory with the backend.
      // });

    } catch (error) {
      console.error("Error updating shopping list status:", error);
    }
  }

  async function handleDelete() {
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
    <div className="item">
      <p>
        <strong>{item.name}</strong>
      </p>
      <Link to={`/item-details/${item._id}`}>
        <button>Details</button>
      </Link>
      <p>Quantity: {item.quantity}</p>
      {item.shoppingStatus === "shopping" ? (
        <button onClick={handleRemoveFromShoppingList}>
          Remove from Shopping List
        </button>
      ) : (
        <button onClick={handleAddToShoppingList}>Add to Shopping List</button>
      )}

      <Link to={`/edit-item/${item._id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
