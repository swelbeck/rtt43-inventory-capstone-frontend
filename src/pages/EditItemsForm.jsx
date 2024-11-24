import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findOneItem, updateItem } from "../utilities/api/itemController.mjs";
import { InventoryContext } from "../contexts/InventoryContext";
import ACTIONS from "../utilities/reducers/inventoryReducerActions.mjs";

export default function EditItemsForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const { dispatch } = useContext(InventoryContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "Uncategorized",
    quantity: 1,
    datePurchased: "",
    reminderDate: "",
    addedToShoppingList: false,
    shoppingStatus: "None",
  });

  useEffect(() => {
    async function getData() {
      if (id) {
        const data = await findOneItem(id);
        console.log(data); // For debugging purposes
        setFormData(data); // Set form data with fetched item details
      } else {
        console.error("Item ID is missing");
      }
    }
    getData();
  }, [id]); // Use the `id` as dependency to trigger effect when it's available

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
      const updatedItem = await updateItem(id, formData);
      console.log("Updated Item:", updatedItem);
      dispatch({ type: ACTIONS.EDIT_ITEM, payload: updatedItem });

      if (formData.addedToShoppingList) {
        updatedItem.shoppingStatus = "shopping";
        dispatch({
          type: ACTIONS.TOGGLE_SHOPPING_STATUS,
          payload: updatedItem,
        });
      }
      nav("/inventory");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Edit Item</h2>
      {formData ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={formData.name} // Bind name input to formData
            />
          </label>
          <br />

          <label>
            Category:{" "}
            <select
              onChange={handleChange}
              name="category"
              value={formData.category} // Bind category select to formData.category
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
              value={formData.quantity} // Bind quantity input to formData.quantity
            />
          </label>
          <br />

          <label>
            Date Purchased:{" "}
            <input
              onChange={handleChange}
              type="date"
              name="datePurchased"
              value={formData.datePurchased} // Bind datePurchased input to formData.datePurchased
            />
          </label>
          <br />

          <label>
            Reminder Date for Restock:{" "}
            <input
              onChange={handleChange}
              type="date"
              name="reminderDate"
              value={formData.reminderDate} // Bind reminderDate input to formData.reminderDate
            />
          </label>
          <br />

          <label>
            Add to Shopping List?:{" "}
            <input
              onChange={handleChange}
              type="checkbox"
              name="addedToShoppingList"
              checked={formData.addedToShoppingList} // Use `checked` to bind checkbox
            />
          </label>
          <br />

          <label>
            Shopping Status:
            <select
              name="shoppingStatus"
              value={formData.shoppingStatus} // Bind shoppingStatus select to formData.shoppingStatus
              onChange={handleChange}
            >
              <option value="None">None</option>
              <option value="shopping">Shopping</option>
              <option value="bought">Bought</option>
            </select>
          </label>
          <br />

          <input type="submit" value="Save Changes" />
        </form>
      ) : (
        <p>Loading item details...</p>
      )}
      <button onClick={handleClick}>Close Form</button>
    </div>
  );
}
