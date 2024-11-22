import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../contexts/InventoryContext";
import InventoryCategory from "../components/InventoryCategory";
import { findItemsByCategory } from "../utilities/itemController.mjs";
import AddItemsForm from "./AddItemsForm";

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);

  // Group items by category
  const categories = inventory.reduce((acc, item) => {

    if (!item || !item.category) return acc;

    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  function handleSubmit(e){
    e.preventDefault()
  }

  async function handleChange(e){
    console.log(e.target)
    if(e.target.value){
      await findItemsByCategory(e.target.value)
    }
  }

  return (
    <div className="inventory-container">
      <h2>Your Inventory</h2>
      <Link to={"/add-items"}>Add Item to Inventory</Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Filter by Category:
          <select
            onChange={handleChange}
            name="catFilter"
            id="catFilter"
          >
            {categories &&
              Object.keys(categories).map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
          </select>
        </label>
      </form>
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
