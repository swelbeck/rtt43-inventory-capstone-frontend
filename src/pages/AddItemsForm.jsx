import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryContext } from "../contexts/InventoryContext";
import ACTIONS from "../utilities/reducers/inventoryReducerActions.mjs";
import { createItem } from "../utilities/api/itemController.mjs";

export default function AddItemsForm() {
  const nav = useNavigate();
  const { dispatch } = useContext(InventoryContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "Uncategorized",
    quantity: 1,
    datePurchased: Date.now(),
    reminderDate: Date.now() + 7,
    addedToShoppingList: false,
    shoppingStatus: "None",
  });

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

    if (!formData.name) {
      return;
    }

    try {
      const newItem = await createItem({
        ...formData,
        shoppingStatus:
          formData.shoppingStatus === "shopping" ? "shopping" : "None", // Ensure shoppingStatus is "shopping" if checkbox is checked
      });
      
      console.log("New Item Added:", newItem);

      dispatch({ type: ACTIONS.ADD_ITEM, payload: newItem.newItem });

      if (newItem.shoppingStatus === "shopping") {
        dispatch({
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
            <option value="Uncategorized">Uncategorized</option>
            <option value="groceries">Groceries</option>
            <option value="household">Household</option>
            <option value="clothes">Clothes</option>
            <option value="other">Other</option>
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
            value={formData.addedToShoppingList}
          />
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleClick}>Close Form</button>
    </div>
  );
}
