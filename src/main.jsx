import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./LandingPage";
import "./styles/tokens.css";
import "./styles/landing.css";

/* One page, no router. Every link that used to go to a console route is now an
   ordinary outbound link to VITE_CONSOLE_URL, so there is nothing to route. */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  </React.StrictMode>
);
