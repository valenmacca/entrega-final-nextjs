"use client"
import { CarritoContext } from "../../context/carritocontexto";
import { useContext } from 'react';


export default function ButtonBorrarProducto({producidsssss}){
    
    const { cantidad, setCantidad } = useContext(CarritoContext);

    const borrarprodcto = ()=>{
        console.log(producidsssss)
        localStorage.removeItem(`producto${producidsssss}`)
        setCantidad(prevCantidad => prevCantidad - 1);
    }

    return(
        <button onClick={borrarprodcto} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
        Eliminar del carrito
        </button>
    )
}