import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
<BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
      <AuthProvider>
        <App />
        </AuthProvider>
</BrowserRouter>

);
