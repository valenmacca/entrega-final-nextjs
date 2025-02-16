"use client"
import { useEffect, useState } from "react";
import ButtonComprar from "@/app/components/ButtonComprar/page";

export default function ProductPage({ params }) {

  const [id, setid] = useState(null)
  const [product, setproduct] = useState(null)


  useEffect(() => {

    const giveid = async ()=>{
      const { id } = await params
      setid(id)
    }

    giveid()

  }, [params])

  
  useEffect(() => {
      if(id){

      const getprosucts = async ()=>{
        
    try{
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        setproduct(data)
      }
      catch(error){
        console.log(error)
      }
      }
  
    getprosucts()
  }
  }, [id])
  

  if (!product) {
    return(<div>Loading...</div>)
  }


  return (

<div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h2>
  <p className="text-gray-600 mb-4">{product.description}</p>
  <img
    src={product.images[0]}
    alt={product.title}
    className="w-full h-auto rounded-lg mb-4"
  />
  <p className="text-xl font-semibold text-green-600">Price: ${Math.floor(product.price)}</p>
    <ButtonComprar produtoid ={id}/>
</div>

  );
}

//`` 


