import { useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../../../contexts/InventoryContext.jsx";
import ACTIONS from "../../../utilities/reducers/inventoryReducerActions.mjs";
import {
  toggleShoppingListStatus,
  deleteItem,
  updateItem
} from "../../../utilities/api/itemController.mjs";
import "./InventoryItem.css";
import {
  FaEdit,
  FaTrashAlt,
  FaInfoCircle,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";

export default function InventoryItem({ item }) {
  const { dispatch } = useContext(InventoryContext);

  // Add item to shopping list
  async function handleAddToShoppingList() {
    try {
      const updatedItem = await updateItem(item._id, {
        shoppingStatus: "shopping",
      });
      dispatch({ type: ACTIONS.TOGGLE_SHOPPING_STATUS, payload: updatedItem });
    } catch (error) {
      console.error("Error updating shopping list status:", error);
    }
  }

  // Remove item from Shopping List
  async function handleRemoveFromShoppingList() {
    try {
      const updatedItem = await updateItem(item._id, {
        shoppingStatus: "None",
      });
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


  return (
    <div className="item">
      <p>
        <strong>{item.name}</strong>
      </p>
      <Link to={`/item-details/${item._id}`}>
        <button title="View Details">
          <FaInfoCircle />
        </button>
      </Link>
      <p>Quantity: {item.quantity}</p>
      {item.shoppingStatus === "shopping" ? (
        <button
          onClick={handleRemoveFromShoppingList}
          title="Remove from Shopping List"
        >
          <FaMinusCircle />
        </button>
      ) : (
        <button onClick={handleAddToShoppingList} title="Add to Shopping List">
          <FaPlusCircle />
        </button>
      )}

      <Link to={`/edit-item/${item._id}`}>
        <button title="Edit Item">
          <FaEdit />
        </button>
      </Link>
      <button onClick={handleDelete} title="Delete Item">
        <FaTrashAlt />
      </button>
    </div>
  );
}
