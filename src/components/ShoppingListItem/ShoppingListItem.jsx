import { useState } from "react";
import "./ShoppingListItem.css";

export default function ShoppingListItem({ item, onSave, onToggle, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  function handleChange(e) {
    setEditedItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    onSave(editedItem);
    setIsEditing(false);
  }

  function handleToggle() {
    onToggle(item);
  }

  function handleRemove() {
    onRemove(item);
  }

  return (
    <div className="item">
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            value={editedItem.quantity}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>
            {item.name} - {item.quantity}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <input
        type="checkbox"
        checked={item.shoppingStatus === "bought"}
        onChange={handleToggle}
      />
      <span>
        {item.shoppingStatus === "bought"
          ? "Move back to shopping"
          : "Move to bought"}
      </span>
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
}
