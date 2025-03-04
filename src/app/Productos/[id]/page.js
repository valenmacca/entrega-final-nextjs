'use client';
import { useEffect, useState } from "react";
import ButtonComprar from "@/app/components/ButtonComprar/ButtonComprar";
import Image from 'next/image';
import { db, doc, getDoc } from "../../../../lib/firebase"; 

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = params.id; 

      try {
        const productRef = doc(db, "products", productId);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data()); 
        } else {
          setError("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el producto: ", error);
        setError("Error al obtener el producto.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();  
    }
  }, [params.id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <Image
        src={product.imageUrl || "/default-image.png"} 
        alt={product.title}
        className="rounded-lg mb-4"
        width={200}
        height={200}
      />
      <p className="text-xl font-semibold text-green-600">Price: ${Math.floor(product.price)}</p>
      <ButtonComprar produtoid={params.id} /> 
    </div>
  );
}
