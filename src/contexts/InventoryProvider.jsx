import { useReducer, useEffect } from "react";
import { InventoryContext } from "./InventoryContext";
import { getInventory } from "../utilities/itemController.mjs";
import ACTIONS from "../utilities/inventoryReducerActions.mjs";
import inventoryReducer from "../utilities/inventoryReducer.mjs";

export default function InventoryProvider({ children }) {
  const [inventory, dispatch] = useReducer(inventoryReducer, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInventory();
        dispatch({ type: ACTIONS.SET_INVENTORY, payload: data });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <InventoryContext.Provider value={{ inventory, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
}
