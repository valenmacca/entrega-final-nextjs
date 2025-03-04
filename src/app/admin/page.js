"use client";

import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    router.push("/adminpage");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="usuario@correo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
