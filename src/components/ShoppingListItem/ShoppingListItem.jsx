// ShoppingListItem.jsx

import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrashAlt, FaEdit, FaExchangeAlt } from "react-icons/fa";
import "./ShoppingListItem.css";

const ITEM_TYPE = "ITEM";

export default function ShoppingListItem({
  item,
  onSave,
  onToggle,
  onRemove,
  moveItem,
  status,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [isChecked, setIsChecked] = useState(item.shoppingStatus === "bought");
  const [purchaseDate, setPurchaseDate] = useState(item.purchaseDate || "");

  // Setup drag hook
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { ...item, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Setup drop hook
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (draggedItem) => {
      if (draggedItem.status !== status) {
        const newStatus =
          draggedItem.status === "shopping" ? "bought" : "shopping"; // Reverse the status when dropped
        moveItem(draggedItem, newStatus); // Call moveItem with new status
      }
    },
  });

  function handleChange(e) {
    setEditedItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    // For "shopping" status, we don't update the database, just the local state
    if (status === "shopping") {
      // If the item is in shopping list, save only locally
      onSave(editedItem);
    } else if (status === "bought") {
      // If the item is bought, update it in the database
      onSave(editedItem);
    }
    setIsEditing(false);
  }

  function handleToggle() {
    onToggle(item);
  }

  function handleRemove() {
    onRemove(item);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    // Set purchase date when checked
    setPurchaseDate(isChecked ? "" : new Date().toISOString().split("T")[0]);
    onToggle(item);
  }

  function handleDateChange(e) {
    setPurchaseDate(e.target.value);
    setEditedItem({ ...editedItem, purchaseDate: e.target.value });
  }

  return (
    <div
      ref={(node) => drag(drop(node))} // Both drag and drop are applied to the element
      className="item"
      style={{
        opacity: isDragging ? 0.5 : 1, // Make the item slightly transparent while dragging
      }}
    >
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
        <div className="item-details">
          {item.shoppingStatus === "shopping" && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="item-checkbox"
            />
          )}
          <p className="item-name">
            {item.name} - {item.quantity}
          </p>
        </div>
      )}

      {isChecked && (
        <div className="purchase-date">
          <label>Purchase Date: </label>
          <input type="date" value={purchaseDate} onChange={handleDateChange} />
        </div>
      )}

      <div className="item-icons">
        <button onClick={() => setIsEditing(true)} title="Edit">
          <FaEdit />
        </button>

        <button onClick={handleRemove} title="Remove">
          <FaTrashAlt />
        </button>

        <button onClick={handleToggle} title="Toggle">
          <FaExchangeAlt />
        </button>
      </div>
    </div>
  );
}
