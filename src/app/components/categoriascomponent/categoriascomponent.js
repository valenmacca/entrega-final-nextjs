"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Categorias() {
const [categories, setCategories] = useState([]);

useEffect(() => {
    const getCategories = async () => {

    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    setCategories(data);
    
};
    getCategories();
}, []);

const ruter = useRouter()
const cambiando = (event)=>{
    const valordecambio = event.target.value
    ruter.push(`/Categories/${valordecambio}`)
}

return (
    <div className="flex flex-col items-center space-y-4">
    <h2 className="text-2xl font-bold mb-4">Selecciona una categoría</h2>
    <select onChange={cambiando} className="w-64 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">-- Selecciona una categoría --</option>
        {categories.map((categoria, index) => (
        <option key={index} value={categoria.slug}>
            {categoria.name}
        </option>
        ))}
    </select>
    </div>
);
}
