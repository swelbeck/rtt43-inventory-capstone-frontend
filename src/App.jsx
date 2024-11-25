import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Inventory from "./pages/Inventory/Inventory";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import CategoryManagement from "./pages/CategoryManagement/CategoryManagement";
import NotFound from "./pages/NotFound/NotFound";
import AddItemsForm from "./pages/AddItemsForm/AddItemsForm";
import EditItemsForm from "./pages/EditItemsForm/EditItemsForm";
import ItemDetails from "./components/Inventory/ItemDetails/ItemDetails";
import Nav from "./components/Nav/Nav";

import "./App.css";

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/add-items" element={<AddItemsForm />} />
        <Route path="/edit-item/:id" element={<EditItemsForm />} />
        <Route path="/item-details/:id" element={<ItemDetails />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
