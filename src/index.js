import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { halloDocTheme } from "./doc.theme";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={halloDocTheme}>
        <App />
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
