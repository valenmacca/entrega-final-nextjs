"use client";
import ButtonInformation from "@/app/components/ButtonInformation/page";
import Categorias from "@/app/components/categoriascomponent/page"
import TitleCard from "@/app/components/TitleCard/page"
import { useEffect, useState } from "react";

export default function ProductPage({ params }) {
  const [categori, setcategori] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const givecategoriesid = async () => {
      const { id } = await params; // Aquí no necesitas 'await' ya que 'params' no es una promesa.
      setcategori(id);
    };

    givecategoriesid();
  }, [params]);

  useEffect(() => {
    const giveproducts = async () => {
      if (!categori) return; // Evita que se haga la solicitud si 'categori' es null.
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${categori}`);
        const data = await response.json();
        setProductos(data.products || []); // Asegúrate de acceder a los productos correctamente.
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
            <img src={product.images[0]} alt={product.title} className="w-[60] h-[60]" />
            <ButtonInformation idproducts={product.id}/>
          </div>
        ))
      )}
    </div>
    </>);
}
