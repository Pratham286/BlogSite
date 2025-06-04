import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { MyProvider } from "./context/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyProvider>
  </StrictMode>
);
