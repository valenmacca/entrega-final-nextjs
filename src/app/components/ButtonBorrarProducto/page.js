"use client"
export default function ButtonBorrarProducto({producidsssss}){

    const borrarprodcto = ()=>{
        console.log(producidsssss)
        localStorage.removeItem(`producto${producidsssss}`)
    }

    return(
        <button onClick={borrarprodcto} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
        Eliminar del carrito
        </button>
    )
}