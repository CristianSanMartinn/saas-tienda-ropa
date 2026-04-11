// src/components/ui/Toast/ToastContext.tsx

import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

import styles from "./Toast.module.css";
import { HiOutlineCheck } from "react-icons/hi";

interface ToastContextType {
  showToast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastUI message={message} visible={visible} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast debe usarse dentro de ToastProvider");
  }

  return ctx;
}

// Componente visual del toast
function ToastUI({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) {
  return (
    <div className={`${styles.toast} ${visible ? styles.show : ""}`}>
      <HiOutlineCheck size={14} className={styles.icon} />
      <span>{message}</span>
    </div>
  );
}