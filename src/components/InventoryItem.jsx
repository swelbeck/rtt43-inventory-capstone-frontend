import { useContext, useState } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
// import { deleteItem } from "../utilities/itemController.mjs";
import ACTIONS from "../utilities/inventoryReducerActions.mjs";
import {
  toggleShoppingListStatus,
  findOneItem,
  deleteItem,
} from "../utilities/itemController.mjs";
import ItemDetails from "./ItemDetails.jsx";

export default function InventoryItem({ item }) {
  // const [detail, setItemDetail] = useState(null);
  const { dispatch } = useContext(InventoryContext);

  // console.log(item)
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
      <p>Quantity: {item.quantity}</p>
      <ItemDetails  item={item}/>
      <button onClick={handleToggleShopping}>
        {item.addedToShoppingList
          ? "Remove from Shopping List"
          : "Add to Shopping List"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
