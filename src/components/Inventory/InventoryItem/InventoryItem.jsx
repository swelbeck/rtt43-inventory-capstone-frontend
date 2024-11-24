import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../../../contexts/InventoryContext.jsx";
import ACTIONS from "../../../utilities/reducers/inventoryReducerActions.mjs";
import {
  toggleShoppingListStatus,
  deleteItem,
} from "../../../utilities/api/itemController.mjs";
import ItemDetails from "../ItemDetails/ItemDetails.jsx";

export default function InventoryItem({ item }) {
  const { dispatch } = useContext(InventoryContext);

  async function handleToggleShopping() {
    try {
      const updatedItem = await toggleShoppingListStatus(item._id);
      dispatch({ type: ACTIONS.TOGGLE_SHOPPING_STATUS, payload: updatedItem });
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

  // function handleDetailWindowClose(e) {
  //   if (e.target.className === "popup-overlay") {
  //     setDetailWindow(null);
  //   }
  // }

  return (
    <div className="item">
      <p>
        <strong>{item.name}</strong>
      </p>
      <Link to={`/item-details/${item._id}`}>
        <button>Details</button>
      </Link>
      <p>Quantity: {item.quantity}</p>

      <button onClick={handleToggleShopping}>
        {item.addedToShoppingList
          ? "Remove from Shopping List"
          : "Add to Shopping List"}
      </button>
      <Link to={`/edit-item/${item._id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
