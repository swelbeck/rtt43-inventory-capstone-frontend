import { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../../contexts/InventoryContext";
import InventoryCategory from "../../components/Inventory/InventoryCategory/InventoryCategory";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Inventory.css";

export default function Inventory() {
  const { inventory } = useContext(InventoryContext);
  const [filteredItems, setFilteredItems] = useState({});
  const [filteredCategory, setFilteredCategory] = useState("");
  const [searchFormData, setSearchFormData] = useState({
    searchParams: "",
  });

  // Group items by category
  const categories = useMemo(() => {
    return inventory.reduce((acc, item) => {
      const category = item.category?.trim().toLowerCase() || "uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [inventory]);

  useEffect(() => {
    let itemsToFilter = inventory;

    // Filter by category
    if (filteredCategory) {
      itemsToFilter = inventory.filter(
        (item) =>
          (item.category?.trim() || "uncategorized") === filteredCategory
      );
    }

    // Filter by search params
    if (searchFormData.searchParams.trim()) {
      const searchTerm = searchFormData.searchParams.toLowerCase();
      itemsToFilter = itemsToFilter.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }

    // Group items by category
    const groupedItems = itemsToFilter.reduce((acc, item) => {
      const category = item.category?.trim().toLowerCase() || "uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});

    setFilteredItems(groupedItems);
  }, [inventory, filteredCategory, searchFormData]);

  function handleFilterChange(e) {
    setFilteredCategory(e.target.value);
  }

  return (
    <div className="inventory-container">
      <h2>Your Inventory</h2>
      <SearchBar
        searchFormData={searchFormData}
        setSearchFormData={setSearchFormData}
      />
      <Link to={"/add-items"}>Add Item to Inventory</Link>
      <form>
        <label htmlFor="catFilter">
          Filter by Category:{" "}
          <select
            id="catFilter"
            name="catFilter"
            onChange={handleFilterChange}
            value={filteredCategory}
          >
            <option value="">All Categories</option>
            {Object.keys(categories).map((el) => (
              <option key={el} value={el} className="category-headings">
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
