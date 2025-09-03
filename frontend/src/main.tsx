import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme.ts";
import App from "./App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
