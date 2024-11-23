import { useEffect, useState } from "react";
import { findOneItem } from "../utilities/itemController.mjs";

export default function ItemDetails({ item }) {
  // const { dispatch } = useContext(InventoryContext);
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    async function getItemDetails() {
      if (item?._id) {
        const details = await findOneItem(item._id);
        setItemDetails(details);
      }
    }
    getItemDetails();
  }, [item]);
  if (!itemDetails) {
    return <p>Loading item details...</p>;
  }

  if (!itemDetails.category || !itemDetails.name) {
    return <p>Error: Invalid item details.</p>;
  }

  return (
    <div>
      <h2>{itemDetails.category}</h2>
      <div>
        <h3>{itemDetails.name}</h3>
        <p>Quantity: {itemDetails.quantity}</p>
        <p>
          Date Purchased: {new Date(itemDetails.datePurchased).toDateString()}
        </p>
        <p>
          Reminder Date: {new Date(itemDetails.reminderDate).toDateString()}
        </p>
        <p>Shopping Status: {itemDetails.shoppingStatus || "None"}</p>
      </div>
    </div>
  );
}
