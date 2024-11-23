import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../utilities/itemController.mjs";
import { InventoryContext } from "../contexts/InventoryContext";
import ACTIONS from "../utilities/inventoryReducerActions.mjs";

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
    e.preventDefault();
    try {
      const newItem = await createItem(formData);

      dispatch({ type: ACTIONS.ADD_ITEM, payload: newItem });

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
          <select
            onChange={handleChange}
            name="category"
            value={formData.category}
          >
            <option value="Uncategorized">Uncategorized</option>
            <option value="groceries">Groceries</option>
            <option value="household">Household</option>
            <option value="clothes">Clothes</option>
            <option value="clothes">Other</option>
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

        <label>
          Shopping Status:
          <select
            name="shoppingStatus"
            value={formData.shoppingStatus}
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="shopping">Shopping</option>
            <option value="bought">Bought</option>
          </select>
        </label>
        <br />
        
        <input type="submit" />
      </form>
      <button onClick={handleClick}>Close Form</button>
    </div>
  );
}
