import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="bottom-left" 
      autoClose={2000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick
      pauseOnHover
      draggable
    />
  </React.StrictMode>
);


reportWebVitals();
