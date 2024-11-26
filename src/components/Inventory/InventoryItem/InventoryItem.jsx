// InventoryItem.jsx

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../../../contexts/InventoryContext.jsx";
import ACTIONS from "../../../utilities/reducers/inventoryReducerActions.mjs";
import {
  toggleShoppingListStatus,
  deleteItem,
  updateItem,
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
  const { dispatchInventory } = useContext(InventoryContext);
  // const [quantity, setQuantity] = useState(item.quantity);

  // Add item to shopping list
  async function handleAddToShoppingList() {
    try {
      const updatedItem = await updateItem(item._id, {
        shoppingStatus: "shopping",
      });
      dispatchInventory({
        type: ACTIONS.TOGGLE_SHOPPING_STATUS,
        payload: updatedItem,
      });
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
      dispatchInventory({
        type: ACTIONS.TOGGLE_SHOPPING_STATUS,
        payload: updatedItem,
      });
    } catch (error) {
      console.error("Error updating shopping list status:", error);
    }
  }

  async function handleDelete() {
    try {
      const success = await deleteItem(item._id);
      if (success) {
        dispatchInventory({ type: ACTIONS.DELETE_ITEM, payload: item._id });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  // // Function to handle quantity change
  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity);

  //   // When quantity hits 0, prompt the user to add to the shopping list
  //   if (newQuantity === 0) {
  //     const addToShoppingList = window.confirm(
  //       "This item is out of stock. Do you want to add it to the shopping list?"
  //     );

  //     if (addToShoppingList) {
  //       addItemToShoppingList(item._id);
  //     }
  //   }
  // };

  // // Function to update item status to "shopping"
  // const addItemToShoppingList = async (itemId) => {
  //   try {
  //     const updatedItem = await updateItem(itemId, {
  //       shoppingStatus: "shopping",
  //     });
  //     console.log("Item added to shopping list:", updatedItem);
  //   } catch (error) {
  //     console.error("Error adding item to shopping list:", error);
  //   }
  // };

  return (
    <div className="item">
      <div className="item-name">
        <p className="item-name">
          <strong>{item.name}</strong>
        </p>
      </div>

      <div className="item-quantity">
        <p>Quantity: {item.quantity}</p>
        {/* <button onClick={() => handleQuantityChange(quantity - 1)}>
          Decrease
        </button> */}
      </div>

      <div className="item-icons">
        <Link to={`/item-details/${item._id}`}>
          <button title="View Details">
            <FaInfoCircle />
          </button>
        </Link>

        {item.shoppingStatus === "shopping" ? (
          <button
            onClick={handleRemoveFromShoppingList}
            title="Remove from Shopping List"
          >
            <FaMinusCircle />
          </button>
        ) : (
          <button
            onClick={handleAddToShoppingList}
            title="Add to Shopping List"
          >
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
    </div>
  );
}
