"use client";

import { useState } from "react";
import { db, collection, addDoc } from "../../../lib/firebase"; 

export default function AdminPage() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      await addDoc(collection(db, "products"), {
        nombre,
        precio: parseFloat(precio),
      });

      setMensaje("Producto agregado correctamente ✅");
      setNombre("");
      setPrecio("");
    } catch (error) {
      setMensaje("Error al agregar el producto ❌");
      console.error("Error al subir el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Agregar Producto</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Agregando..." : "Agregar Producto"}
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center font-semibold">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
