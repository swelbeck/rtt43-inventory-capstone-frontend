import { useContext } from "react";
import { deleteItem } from "../utilities/itemController.mjs";
import { InventoryContext } from "../contexts/InventoryContext";
import ACTIONS from "../utilities/inventoryReducerActions.mjs";

function ItemRow({ item}) {
  const {dispatch} = useContext(InventoryContext)

  async function handleDelete(id) {
    try {
      const success = await deleteItem(item._id);
      if (success) {
        dispatch({type: ACTIONS.DELETE_ITEM, payload: id});
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default ItemRow;
