import { deleteItem } from "../utilities/itemController.mjs";

function ItemRow({ product, setInventory }) {
  async function handleDelete() {
    try {
      const success = await deleteItem(product._id);
      if (success) {
        setInventory((prev) => prev.filter((el) => el._id !== product._id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default ItemRow;
