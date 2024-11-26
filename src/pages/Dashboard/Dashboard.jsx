import { useState, useEffect } from "react";
import { getInventory } from "../../utilities/api/itemController.mjs";
import "./Dashboard.css";

export default function Dashboard() {
  const [totalItems, setTotalItems] = useState(0);
  const [shoppingListItems, setShoppingListItems] = useState(0);
  const [boughtItems, setBoughtItems] = useState(0);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const inventory = await getInventory();

        // Calculate the metrics dynamically
        setTotalItems(inventory.length); // Total items
        setShoppingListItems(
          inventory.filter((item) => item.shoppingStatus === "shopping").length
        ); // Items in shopping list
        setBoughtItems(
          inventory.filter((item) => item.shoppingStatus === "bought").length
        ); // Items marked as bought
      } catch (error) {
        console.error("Error fetching inventory metrics:", error);
      }
    }

    fetchMetrics();
  }, []);

  return (
    <div className="dashboard-metrics">
      <div className="metric">
        <h3>Total Inventory Items</h3>
        <p>{totalItems}</p>
      </div>
      <div className="metric">
        <h3>Shopping List</h3>
        <p>{shoppingListItems} items</p>
      </div>
      <div className="metric">
        <h3>Bought Items</h3>
        <p>{boughtItems} items</p>
      </div>
    </div>
  );
}
