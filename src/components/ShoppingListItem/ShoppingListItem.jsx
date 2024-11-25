import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
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
    item: { ...item, status }, // Spread the entire item object, not just the id and status
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
    onSave(editedItem);
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
        <>
          <p>
            {item.name} - {item.quantity}
          </p>
          <button onClick={() => setIsEditing(true)} title="Edit">
            <FaEdit />
          </button>
        </>
      )}

      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {isChecked && (
        <div>
          <label>Purchase Date: </label>
          <input type="date" value={purchaseDate} onChange={handleDateChange} />
        </div>
      )}
      <button onClick={handleRemove} title="Remove">
        <FaTrashAlt />
      </button>

      <button onClick={handleToggle} title="Toggle">
        Toggle
      </button>
    </div>
  );
}
