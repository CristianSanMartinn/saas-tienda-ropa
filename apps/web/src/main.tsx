// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./cart/CartContext";
import { ToastProvider } from "./components/ui/Toast/ToastContext";
import { AuthProvider }  from './auth/AuthContext'

import App from "./App";
import "./styles/globals.css";

// NOTA:
// El punto de entrada de la aplicación renderiza el componente 
// App dentro de varios proveedores de contexto, incluyendo el 
// AuthProvider para la autenticación, el CartProvider para el carrito de compras y el 
// ToastProvider para las notificaciones. También envuelve todo en un BrowserRouter para 
// habilitar la navegación entre páginas.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);