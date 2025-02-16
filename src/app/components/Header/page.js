"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [numeros, setNumeros] = useState(0);

  useEffect(() => {
    // Función para actualizar la cantidad en el carrito
    const actualizarCantidad = () => {
      setNumeros(localStorage.length);
    };

    // Llamar a la función al inicio para establecer el número correcto
    actualizarCantidad();

    // Interceptar modificaciones a localStorage en la misma pestaña
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      window.dispatchEvent(new Event("localStorageUpdated"));
    };

    const originalRemoveItem = localStorage.removeItem;
    localStorage.removeItem = function (key) {
      originalRemoveItem.apply(this, arguments);
      window.dispatchEvent(new Event("localStorageUpdated"));
    };

    // Escuchar el evento personalizado para actualizar la cantidad
    window.addEventListener("localStorageUpdated", actualizarCantidad);

    return () => {
      // Restaurar las funciones originales y eliminar el event listener
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
      window.removeEventListener("localStorageUpdated", actualizarCantidad);
    };
  }, []);

  return (
    <header className="bg-black text-white p-4 flex justify-between">
      <h1>ecommerce-valentinomaccaroni</h1>
      <nav className="flex gap-4">
        <Link href="/">home</Link>
        <Link href="/Productos">productos</Link>
        <Link href="/Carrito" className="flex items-center gap-1">
          <ShoppingCart className="w-5 h-5 text-white" />
          <span>{numeros}</span>
        </Link>
      </nav>
    </header>
  );
}
