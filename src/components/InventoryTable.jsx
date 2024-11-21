import ItemRow from "./ItemRow";
import ItemCategoryRow from "./ItemCategoryRow";

function InventoryTable({ items, setInventory }) {
  let rows = [];
  let cat = null;

  items.forEach((el) => {
    if (cat !== el.category) {
      cat = el.category;
      rows.push(
        <ItemCategoryRow category={el.category} key={el.category} />
      );
    }

    rows.push(
      <ItemRow item={el} setInventory={setInventory} key={el._id} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default InventoryTable;
