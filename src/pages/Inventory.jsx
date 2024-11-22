import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../contexts/InventoryContext";
import InventoryCategory from "../components/InventoryCategory";

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);
  const [filteredCategory, setFilteredCategory] = useState("");

  // Group items by category
  const categories = inventory.reduce((acc, item) => {
    const category = item.category?.trim() || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Filter items by selected category
  const filteredItems = filteredCategory
    ? { [filteredCategory]: categories[filteredCategory] || [] }
    : categories;

  function handleFilterChange(e) {
    setFilteredCategory(e.target.value);
  }

  return (
    <div className="inventory-container">
      <h2>Your Inventory</h2>
      <Link to={"/add-items"}>Add Item to Inventory</Link>
      <form>
        <label htmlFor="catFilter">
          Filter by Category:
          <select
            id="catFilter"
            name="catFilter"
            onChange={handleFilterChange}
            value={filteredCategory}
          >
            <option value="">All Categories</option>
            {Object.keys(categories).map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
      </form>
      {Object.keys(filteredItems).length > 0 ? (
        <div className="categories">
          {Object.entries(filteredItems).map(([category, items]) => (
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
