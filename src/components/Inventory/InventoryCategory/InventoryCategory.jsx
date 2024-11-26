// InventoryCategory.jsx

import InventoryItem from "../InventoryItem/InventoryItem";
import "./InventoryCategory.css";

export default function InventoryCategory({ category, items }) {
  return (
    <div className="category-container">
      <h3>{category}</h3>
      <div className="items">
        {items.map((item) => (
          <InventoryItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
