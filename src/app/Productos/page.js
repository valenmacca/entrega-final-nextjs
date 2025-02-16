"use client"
import { useEffect, useState } from "react"
import TitleCard from '../components/TitleCard/page'
import ButtonInformation from "../components/ButtonInformation/page"
import Categorias from "../components/categoriascomponent/page"

export default function Productos(){
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(true)
    
    
    useEffect(() => {
        const giveproducts = async () =>{
        let url = 'https://dummyjson.com/products'
        try{
            const respuesta = await fetch(url);
            const data = await respuesta.json();
            setproducts(data.products)
            setloading(false)

        }catch(error){
            console.log(error)
        }
    }
    
    giveproducts()
    }, [])
    
    if(loading){
        return(

            <div>Cargando....</div>
        )
    }


    return(
            <>
            <Categorias/>
            <TitleCard>Productos</TitleCard>
            <div className="grid grid-cols-3 gap-4 p-4">
                {products.map((products)=>{
                    return(
                    <div key={products.id} className="flex flex-col items-center p-4 border rounded shadow-md">
                        <h1>{products.title}</h1>
                        <p>{products.price}</p>
                        <img
                                        src={products.images[0]}
                                        alt={products.title}
                                        className="w-[60] h-[60]"
                        />
                        <ButtonInformation idproducts={products.id}/>
                    </div>
                    )
                })}
            </div>
            </>
    )
}
