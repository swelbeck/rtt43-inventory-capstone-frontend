// ItemDetails.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findOneItem } from "../../../utilities/api/itemController.mjs";

export default function ItemDetails() {
  const [itemDetails, setItemDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getItemDetails() {
      if (id) {
        const details = await findOneItem(id);
        setItemDetails(details);
      }
    }
    getItemDetails();
  }, [id]);

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
