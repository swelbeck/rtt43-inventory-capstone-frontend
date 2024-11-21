import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import ShoppingList from "./pages/ShoppingList";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";

import "./App.css";

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
