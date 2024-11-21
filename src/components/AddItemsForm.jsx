import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../utilities/itemController.mjs";

export default function AddItemsForm() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 1,
    datePurchased: Date.now(),
    reminderDate: Date.now() + 7,
    addedToShoppingList: false,
  });

  function handleClick() {
    nav("/");
  }

  function handleChange(e) {
    if (e.target.name == "addedToShoppingList") {
      setFormData({
        ...formData,
        stocked: !formData.addedToShoppingList,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let res = await createItem(formData);
      // setInventory([...inventory, res]);
      nav("/inventory");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Add Items to Inventory</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input onChange={handleChange} type="text" name="name" />
        </label>
        <br />

        <label>
          Category:{" "}
          <select onChange={handleChange} type="text" name="category">
            <option value="groceries">Groceries</option>
            <option value="household">Household</option>
            <option value="clothes">Clothes</option>
          </select>
        </label>
        <br />

        <label>
          Quantity:{" "}
          <input onChange={handleChange} type="number" name="quantity" />
        </label>
        <br />

        <label>
          Date Purchased:{" "}
          <input onChange={handleChange} type="date" name="datePurchased" />
        </label>
        <br />

        <label>
          Reminder Date for Restock:{" "}
          <input onChange={handleChange} type="date" name="reminderDate" />
        </label>
        <br />

        <label>
          In Shopping List?:{" "}
          <input
            onChange={handleChange}
            type="checkbox"
            name="addedToShoppingList"
          />
        </label>
        <br />

        <input type="submit" />
      </form>
      <button onClick={handleClick}>Close Form</button>
    </div>
  );
}
