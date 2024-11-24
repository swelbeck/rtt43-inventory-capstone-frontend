import { useState, useEffect } from "react";
import { findOneItem } from "../../../utilities/api/itemController.mjs";

export default function ItemDetails({ item }) {
  const [itemDetails, setItemDetails] = useState(item);

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

  return (
    <div>
      <h2>{itemDetails.category}</h2>
      <h3>{itemDetails.name}</h3>
      <p>Quantity: {itemDetails.quantity}</p>
      <p>
        Date Purchased: {new Date(itemDetails.datePurchased).toDateString()}
      </p>
      <p>Reminder Date: {new Date(itemDetails.reminderDate).toDateString()}</p>
      <p>Shopping Status: {itemDetails.shoppingStatus}</p>
    </div>
  );
}
