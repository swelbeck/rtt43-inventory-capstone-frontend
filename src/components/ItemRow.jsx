// import { useContext } from "react";
// import { deleteItem } from "../utilities/itemController.mjs";
// import { InventoryContext } from "../contexts/InventoryContext";
// import ACTIONS from "../utilities/inventoryReducerActions.mjs";
// import { toggleShoppingListStatus } from "../utilities/itemController.mjs";

// function ItemRow({ item }) {
//   const { dispatch } = useContext(InventoryContext);

//   async function handleToggleShopping() {
//     try {
//       const updatedItem = await toggleShoppingListStatus(item._id);
//       dispatch({ type: ACTIONS.UPDATE_ITEM, payload: updatedItem });
//     } catch (error) {
//       console.error("Error updating shopping list status:", error);
//     }
//   }

//   async function handleDelete(id) {
//     try {
//       const success = await deleteItem(item._id);
//       if (success) {
//         dispatch({ type: ACTIONS.DELETE_ITEM, payload: id });
//       }
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   }

//   return (
//     <tr>
//       <td>{item.name}</td>
//       <td>{item.quantity}</td>
//       <td>
//         <button onClick={handleToggleShopping}>
//           {item.addedToShoppingList
//             ? "Remove from Shopping List"
//             : "Add to Shopping List"}
//         </button>
//       </td>
//       <td>
//         <button onClick={handleDelete}>Delete</button>
//       </td>
//     </tr>
//   );
// }

// export default ItemRow;
