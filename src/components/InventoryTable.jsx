// import ItemRow from "./ItemRow";
// import ItemCategoryRow from "./ItemCategoryRow";

// function InventoryTable({ items, setInventory }) {
  
//   // Create a set of unique categories
//   const uniqueCategories = [...new Set(items.map((item) => item.category))];

//   return (
//     <div>
//       {uniqueCategories.map((category) => (
//         <div key={category}>
//           <h3>{category}</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Quantity</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items
//                 .filter((item) => item.category === category)
//                 .map((filteredItem) => (
//                   <ItemRow
//                     item={filteredItem}
//                     setInventory={setInventory}
//                     key={filteredItem._id}
//                   />
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default InventoryTable;
