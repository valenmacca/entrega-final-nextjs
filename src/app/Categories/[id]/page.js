"use client";
import ButtonInformation from "@/app/components/ButtonInformation/ButtonInformation";
import Categorias from "@/app/components/categoriascomponent/categoriascomponent"
import TitleCard from "@/app/components/TitleCard/title"
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function ProductPage({ params }) {
  const [categori, setcategori] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const givecategoriesid = async () => {
      const { id } = await params;
      setcategori(id);
    };

    givecategoriesid();
  }, [params]);

  useEffect(() => {
    const giveproducts = async () => {
      if (!categori) return; 
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${categori}`);
        const data = await response.json();
        setProductos(data.products || []); 
      } catch (error) {
        console.log(error);
      }
    };

    giveproducts();
  }, [categori]);

  return (<>
                <Categorias/>
                <TitleCard>{categori}</TitleCard>
    <div className="grid grid-cols-3 gap-4 p-4">
      {productos.length === 0 ? (
        <p>No products found.</p>
      ) : (
        productos.map((product) => (
          <div key={product.id} className="flex flex-col items-center p-4 border rounded shadow-md">
            <h1>{product.title}</h1>
            <p>{product.price}</p>
                                            <Image
                                src={product.images[0]}
                                alt={product.title}
                                width={60}
                                height={60}
                                className="w-[60px] h-[60px]"
                                />
            <ButtonInformation idproducts={product.id}/>
          </div>
        ))
      )}
    </div>
    </>);
}
