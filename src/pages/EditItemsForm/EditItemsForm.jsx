import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  findOneItem,
  updateItem,
} from "../../utilities/api/itemController.mjs";
import { InventoryContext } from "../../contexts/InventoryContext";
import ACTIONS from "../../utilities/reducers/inventoryReducerActions.mjs";

export default function EditItemsForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const { dispatch } = useContext(InventoryContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "uncategorized",
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
        // console.log(data);
        setFormData({
          ...data,
          datePurchased: new Date(data.datePurchased)
            .toISOString()
            .split("T")[0], // Format to yyyy-MM-dd
          reminderDate: data.reminderDate
            ? new Date(data.reminderDate).toISOString().split("T")[0] // Format reminderDate
            : "",
          addedToShoppingList: data.shoppingStatus === "shopping",
        });

        // check for duplicates
        const allItems = await getInventory();
        setExistingItems(allItems);
      } else {
        console.error("Item ID is missing");
      }
    }
    getData();
  }, [id]);

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

    const normalizedItemName = formData.name.toLowerCase().trim();
    const normalizedCategory = formData.category.toLowerCase().trim();

    const duplicateItem = existingItems.some(
      (item) =>
        item.name.toLowerCase().trim() === normalizedItemName &&
        item.category.toLowerCase().trim() === normalizedCategory &&
        item._id !== id // Make sure we don't check the current item being edited
    );

    if (duplicateItem) {
      setIsDuplicate(true);
      return; // Prevent form submission if a duplicate is found
    } else {
      setIsDuplicate(false);
    }

    try {
      // Ensure reminderDate is a valid Date object
      const updatedItem = await updateItem(id, {
        ...formData,
        reminderDate: new Date(formData.reminderDate), // Make sure reminderDate is a Date object
      });
      // console.log("Updated Item:", updatedItem);
      dispatch({ type: ACTIONS.EDIT_ITEM, payload: updatedItem });

      if (formData.addedToShoppingList) {
        updatedItem.shoppingStatus = "shopping";
        dispatch({
          type: ACTIONS.ADD_ITEM_TO_SHOPPING_LIST,
          payload: updatedItem,
        });
      }

      nav("/inventory");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  return (
    <div>
      <h2>Edit Item</h2>
      {isDuplicate && (
        <p style={{ color: "red" }}>
          This item already exists in the selected category.
        </p>
      )}
      {formData ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={formData.name}
            />
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

          <input type="submit" value="Save Changes" />
        </form>
      ) : (
        <p>Loading item details...</p>
      )}
      <button onClick={handleClick}>Close Form</button>
    </div>
  );
}
