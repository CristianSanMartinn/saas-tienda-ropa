// src/App.tsx

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { AnnouncementBar } from "./components/layout/AnnouncementBar/AnnouncementBar";
import { Navbar } from "./components/layout/Navbar/Navbar";
import { Footer } from "./components/layout/Footer/Footer";
import { CartDrawer } from "./cart/CartDrawer/CartDrawer";
import { ScrollToTop } from "./components/ui/ScrollToTop/ScrollToTop";

import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />

      <Navbar onCartOpen={() => setCartOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductPage />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <ScrollToTop />
    </>
  );
}