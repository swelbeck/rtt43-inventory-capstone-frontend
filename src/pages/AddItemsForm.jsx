import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../utilities/itemController.mjs";
import { checkCategoryExists } from "../utilities/categoryController.mjs";
import { InventoryContext } from "../contexts/InventoryContext";
import ACTIONS from "../utilities/inventoryReducerActions.mjs";

export default function AddItemsForm() {
  const nav = useNavigate();
  const { dispatch } = useContext(InventoryContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 1,
    datePurchased: Date.now(),
    reminderDate: Date.now() + 7,
    addedToShoppingList: false,
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
    const catExists = await checkCategoryExists(formData.category);

    if (catExists) {
      alert("This category already exists!");
      return;
    }
    console.log(formData);
    try {
      e.preventDefault();
      const newItem = await createItem(formData);

      console.log(newItem);

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
          <select onChange={handleChange} type="text" name="category">
            <option value="">Select an option</option>
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

        <input type="submit" />
      </form>
      <button onClick={handleClick}>Close Form</button>
    </div>
  );
}
