import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import InventoryProvider from "./contexts/InventoryContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InventoryProvider>
      <Router>
        <App />
      </Router>
    </InventoryProvider>
  </StrictMode>
);
