// src/components/layout/Navbar/Navbar.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiMenu,
  HiX,
} from "react-icons/hi";

import { useCart } from "../../../hooks/useCart";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onCartOpen: () => void;
}

const navItems = [
  {
    label: "Camisas",
    sub: ["Oxford Clásica", "Lino Premium", "Flanela Suave", "Manga Corta"],
  },
  {
    label: "Poleras",
    sub: ["Cuello redondo", "Cuello V", "Polo", "Henley"],
  },
  { label: "Pantalones", sub: [] },
  { label: "Chaquetas", sub: [] },
  { label: "Accesorios", sub: [] },
];

export function Navbar({ onCartOpen }: NavbarProps) {
  const { totalItems } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          MASC
        </Link>

        {/* Links desktop */}
        <div className={styles.center}>
          {navItems.map((item) => (
            <div key={item.label} className={styles.navItem}>
              <span>{item.label}</span>

              {item.sub.length > 0 && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaCol}>
                    <h4 className={styles.megaTitle}>Colección</h4>

                    {item.sub.map((s) => (
                      <Link key={s} to="/" className={styles.megaLink}>
                        {s}
                      </Link>
                    ))}
                  </div>

                  <div className={styles.megaCol}>
                    <h4 className={styles.megaTitle}>Ocasión</h4>

                    <Link to="/" className={styles.megaLink}>
                      Formal
                    </Link>

                    <Link to="/" className={styles.megaLink}>
                      Business Casual
                    </Link>

                    <Link to="/" className={styles.megaLink}>
                      Fin de semana
                    </Link>
                  </div>

                  <div className={styles.megaImg}>
                    <span className={styles.megaImgLabel}>Lo nuevo</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Íconos */}
        <div className={styles.icons}>
          <HiOutlineSearch size={20} />
          <HiOutlineUser size={20} />

          {/* BOTÓN CARRITO */}
          <div className={styles.cartBtn} onClick={onCartOpen}>
            <HiOutlineShoppingBag size={20} />

            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menú"
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileOpen : ""
        }`}
      >
        {navItems.map((item, i) => (
          <Link
            key={item.label}
            to="/"
            className={styles.mobileLink}
            style={{ transitionDelay: `${i * 0.05}s` }}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}