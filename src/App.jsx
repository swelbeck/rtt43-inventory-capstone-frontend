import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import ShoppingList from "./pages/ShoppingList";
import CategoryManagement from "./pages/CategoryManagement";
import NotFound from "./pages/NotFound";
import AddItemsForm from "./pages/AddItemsForm";
import EditItemsForm from "./pages/EditItemsForm"
import Nav from "./components/Nav";

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
        <Route path="/edit-item" element={<EditItemsForm />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
