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

  console.log("Item in ShoppingListItem:", item);

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
         draggedItem.status === "shopping" ? "bought" : "shopping";
       moveItem(draggedItem, newStatus); // Pass the full draggedItem object
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
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={handleRemove}>
        <FaTrashAlt /> Remove
      </button>

      <button onClick={handleToggle}>
        <FaEdit /> Toggle
      </button>
    </div>
    // <div className="item">
    //   {isEditing ? (
    //     <>
    //       <input
    //         type="text"
    //         name="name"
    //         value={editedItem.name}
    //         onChange={handleChange}
    //       />
    //       <input
    //         type="number"
    //         name="quantity"
    //         value={editedItem.quantity}
    //         onChange={handleChange}
    //       />
    //       <button onClick={handleSave}>Save</button>
    //     </>
    //   ) : (
    //     <>
    //       <p>
    //         {item.name} - {item.quantity}
    //       </p>
    //       <button onClick={() => setIsEditing(true)}>Edit</button>
    //     </>
    //   )}
    //   <input
    //     type="checkbox"
    //     checked={item.shoppingStatus === "bought"}
    //     onChange={handleToggle}
    //   />
    //   <span>
    //     {item.shoppingStatus === "bought"
    //       ? "Move back to shopping"
    //       : "Move to bought"}
    //   </span>
    //   <button onClick={handleRemove}>Delete</button>
    // </div>
  );
}
