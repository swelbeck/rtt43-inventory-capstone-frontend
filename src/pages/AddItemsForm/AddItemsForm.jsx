// AddItemsForm.jsx
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryContext } from "../../contexts/InventoryContext";
import ACTIONS from "../../utilities/reducers/inventoryReducerActions.mjs";
import {
  createItem,
  getInventory,
} from "../../utilities/api/itemController.mjs";
import "./AddItemsForm.css";

export default function AddItemsForm() {
  const nav = useNavigate();
  const { dispatchInventory, categories } = useContext(InventoryContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "uncategorized",
    quantity: 1,
    datePurchased: new Date().toISOString().split("T")[0], // Format as yyyy-MM-dd
    reminderDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 days later, formatted as yyyy-MM-dd
    addedToShoppingList: false,
    shoppingStatus: "None",
  });

  const [existingItems, setExistingItems] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const allItems = await getInventory();
      setExistingItems(allItems);
    }
    fetchItems();
  }, []);

  function handleClick() {
    nav("/inventory");
  }

  function handleChange(e) {
    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
        shoppingStatus: e.target.checked ? "shopping" : "None",
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a name for the item.");
      return;
    }
    // Check if the item already exists
    const normalizedItemName = formData.name.toLowerCase().trim();
    const normalizedCategory = formData.category.toLowerCase().trim();

    // Check if the item already exists in the selected category
    const duplicateItem = existingItems.find(
      (item) =>
        item.name.toLowerCase().trim() === normalizedItemName &&
        item.category.toLowerCase().trim() === normalizedCategory
    );

    if (duplicateItem) {
      setIsDuplicate(true);
      return; // Prevent form submission
    } else {
      setIsDuplicate(false);
    }

    const formDataWithDates = {
      ...formData,
      reminderDate: new Date(formData.reminderDate),
    };

    try {
      const newItem = await createItem({
        ...formDataWithDates,
        shoppingStatus:
          formDataWithDates.shoppingStatus === "shopping" ? "shopping" : "None",
      });

      dispatchInventory({ type: ACTIONS.ADD_ITEM, payload: newItem.newItem });

      if (newItem.shoppingStatus === "shopping") {
        dispatchInventory({
          type: ACTIONS.ADD_ITEM_TO_SHOPPING_LIST,
          payload: newItem.newItem,
        });
      }

      nav("/inventory");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Add Item to Inventory</h2>
      {isDuplicate && (
        <p style={{ color: "red" }}>
          This item already exists in the selected category.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input onChange={handleChange} type="text" name="name" />
        </label>
        <br />

        <label>
          Category:{" "}
          <select
            onChange={handleChange}
            name="category"
            value={formData.category}
          >
            <option value="uncategorized">Uncategorized</option>
            {/* Map through the categories and display them */}
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </label>
        <br />

        <label>
          Quantity:{" "}
          <input
            onChange={handleChange}
            type="number"
            name="quantity"
            value={formData.quantity}
            min={1}
          />
        </label>
        <br />

        <label>
          Date Purchased:{" "}
          <input
            onChange={handleChange}
            type="date"
            name="datePurchased"
            value={formData.datePurchased}
          />
        </label>
        <br />

        <label>
          Reminder Date for Restock:{" "}
          <input
            onChange={handleChange}
            type="date"
            name="reminderDate"
            value={formData.reminderDate}
          />
        </label>
        <br />

        <label>
          Add to Shopping List?:{" "}
          <input
            onChange={handleChange}
            type="checkbox"
            name="addedToShoppingList"
            checked={formData.addedToShoppingList}
          />
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleClick}>Close Form</button>
    </div>
  );
}
