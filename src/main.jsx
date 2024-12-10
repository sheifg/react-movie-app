import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//? required for Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MovieProvider } from "./context/MovieContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </AuthProvider>
    <ToastContainer />
  </BrowserRouter>
);
