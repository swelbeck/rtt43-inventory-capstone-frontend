import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getInventory } from "../utilities/itemController.mjs";
import InventoryTable from "../components/InventoryTable";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInventory();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Your Inventory</h2>
      <Link to={"/add-items"}>Add Items</Link>
      {Object.keys(category).length > 0 ? (
        <div className="categories">
          {Object.entries(category).map(([cat, items]) => (
            <InventoryCategory
              key={cat}
              category={cat}
              items={items}
            />
          ))}
        </div>
      ) : (
        <p>No items in inventory</p>
      )}
    </div>
  );
}
