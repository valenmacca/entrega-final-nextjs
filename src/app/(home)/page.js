"use client"

import { useEffect, useState } from "react";
import TitleCard from "../components/TitleCard/page";
import ButtonInformation from "../components/ButtonInformation/page";
import { Lock, Plane,} from "lucide-react";

export default function Home() {
    const [product, setProduct] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products')
                const data = await response.json()
                setProduct(data.products)  // Asumiendo que los productos están en el campo 'products' de la respuesta
            } catch (error) {
                console.log(error)
            }finally{
                setloading(false)
            }
        }

        getProducts()
    }, [])

    return (
        <div>
            <TitleCard>Bienvenidos</TitleCard>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-gray-900">
                    <Lock className="w-5 h-5 text-blue-500" />
                    <label className="font-medium">Cifrado, protección y confianza en cada clic</label>
                </div>
                <div className="flex items-center gap-2 text-gray-900">
                    <Plane className="w-5 h-5 text-green-500" />
                    <label className="font-medium">Envío en todo el país</label>
                    </div>
            </div>

            <div>
                
            <h2 className="text-2xl font-bold text-gray-900">Los productos con mejores reseñas</h2>
                <div className="grid grid-cols-3 gap-4 p-4">
                {loading ? (<div>Cargando Productos...</div>) : (product.map((product) => {
                    if (product.rating > 4.5) {
                        return (
                            <div key={product.id} className="flex flex-col items-center p-4 border rounded shadow-md">
                                <h1>{product.title}</h1>
                                <p>{product.price}</p>
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-[60] h-[60]"
                                />
                                <ButtonInformation idproducts={product.id} />
                            </div>
                        )
                    }
                }))}
                </div>
            </div>
        </div>
    )
}


