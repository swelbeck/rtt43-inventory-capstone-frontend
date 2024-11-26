import { useReducer, useEffect } from "react";
import { InventoryContext } from "./InventoryContext";
import { getInventory } from "../utilities/api/itemController.mjs";
import { getAllCategories } from "../utilities/api/categoryController.mjs";
import ACTIONS from "../utilities/reducers/inventoryReducerActions.mjs";
import inventoryReducer from "../utilities/reducers/inventoryReducer.mjs";
import categoriesReducer from "../utilities/reducers/categoryReducers.mjs";

export default function InventoryProvider({ children }) {
  const [inventory, dispatchInventory] = useReducer(inventoryReducer, []);
  const [categories, dispatchCategories] = useReducer(categoriesReducer, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const inventoryData = await getInventory();
        const categoriesData = await getAllCategories();

        dispatchInventory({
          type: ACTIONS.SET_INVENTORY,
          payload: inventoryData,
        });
        dispatchCategories({
          type: ACTIONS.SET_CATEGORIES,
          payload: categoriesData,
        });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <InventoryContext.Provider
      value={{ inventory, dispatchInventory, categories, dispatchCategories }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
