"use client"

import { useEffect, useState } from "react";
import TitleCard from "../components/TitleCard/page";
import Swal from 'sweetalert2';

export default function Carrito() {

    const [productscart, setproductscart] = useState([])
    const [Ids, setIds] = useState([]) 
    const [buttonchange, setbuttonchange] = useState(false)
    const [price, setprice] = useState([])





    useEffect(() => {
    
    const preciosactualizos = ()=>{
        const priceaculativo = productscart.reduce((acc, prductos) => acc+prductos.price, 0)
        setprice(priceaculativo)
    }
    preciosactualizos()
    }, [productscart])
    

    useEffect(() => {
    
        const carritoprodictos = async ()=>{
            const productss = []
            for (const id of Ids) {
                    try{
                        const respiesta = await fetch(`https://dummyjson.com/products/${id}`)
                        const data = await respiesta.json()
                        productss.push(data)

                    }catch(error){
                        console.log(error)
                    }
                
                
            }
            setproductscart(productss)
            setbuttonchange(false)
        };
        if (Ids.length > 0) {
            carritoprodictos();
        }
    }, [Ids])
    


    useEffect(() => {
        
        const obtenerProductos = () => {
            const productosGuardados = [];
            
            
            for (let i = 0; i < localStorage.length; i++) {
                const clave = localStorage.key(i);  
                
                
                if (clave.startsWith('producto')) {
                    const productoId = localStorage.getItem(clave); 
                    productosGuardados.push(productoId);
                }
            }
            
            setIds(productosGuardados)
        };

        obtenerProductos();  

    }, []);




const borrarprodcto = (id)=>{
    console.log(id)
    localStorage.removeItem(`producto${id}`)
    setproductscart(productscart.filter(prod => prod.id !== id));
    Swal.fire({
        title: "Producto Eliminado",
        icon: "success",
        draggable: true
        
    });
}


const totaldelacompra = ()=>{
    Swal.fire({
        position: "center",
        icon: "info",
        title: "Proximamente",
        showConfirmButton: false,
        timer: 2500
    });
}


    return (
        <div className="max-w mx-auto p-6">
            <div className="flex  p-4 bg-gray-100 rounded-lg shadow-md">
            <TitleCard>Carrito de Compras</TitleCard>
            </div>

            <div className="mt-6">
                {productscart.length === 0 || buttonchange ? (
                    <div className="text-center text-xl font-semibold text-gray-700">
                        No hay productos en el carrito
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productscart.map((prod, index) => (
                            <div
                                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
                                key={index}
                            >
                                <img
                                    src={prod.images[0]}
                                    alt={prod.title}
                                    className="w-full h-56 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{prod.title}</h2>
                                <p className="text-xl font-semibold text-green-600 mb-4">Price: ${prod.price}</p>
                                    <button onClick={()=>borrarprodcto(prod.id)} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                                    Eliminar del carrito
                                    </button>
                            </div>
                        ))}
                    </div>

                )}
            </div>
            <div className="fixed bottom-0 left-0 w-full flex flex-col items-center gap-2 pt-6 pb-4 border-t bg-white shadow-md">
                <button onClick={totaldelacompra} className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition">
                    Comprar Ahora
                </button>
                <p className="text-lg font-semibold text-gray-900">Precio: ${!price || buttonchange ? (0): (Math.trunc(price))}</p>
            </div>



        </div>
    );
    
}


//``