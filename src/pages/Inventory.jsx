import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../contexts/InventoryContext";
import InventoryCategory from "../components/InventoryCategory";
import AddItemsForm from "./AddItemsForm";

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);

  // Group items by category
  const categories = inventory.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="inventory-container">
      <h2>Your Inventory</h2>
      <Link to={"/add-items"}>Add Item to Inventory</Link>
      {Object.keys(categories).length > 0 ? (
        <div className="categories">
          {Object.entries(categories).map(([category, items]) => (
            <InventoryCategory
              key={category}
              category={category}
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
