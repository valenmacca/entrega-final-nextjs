"use client"
import { useRouter } from "next/navigation"

export default function ButtonInformation({ idproducts }) {
    const router = useRouter();

    const detail = () => {
        router.push(`/Productos/${idproducts}`);
    };

    return (
        <button onClick={detail} className="p-2 bg-blue-500 text-white rounded shadow-lg ">Ver Detalles</button>
    );
}
