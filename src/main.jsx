import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { FrontEndTestApp } from "./FrontEndTestApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FrontEndTestApp />
    </BrowserRouter>
  </StrictMode>
);
