import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import { deleteItem } from "../utilities/itemController.mjs";
import ACTIONS from "../utilities/inventoryReducerActions.mjs";

export default function InventoryItem({ item }) {
  const { dispatch } = useContext(InventoryContext);

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
      <p>Quantity: {item.quantity}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
