"use client"
import { useEffect, useState } from "react";
import TitleCard from '../components/TitleCard/title';
import ButtonInformation from "../components/ButtonInformation/ButtonInformation";
import Categorias from "../components/categoriascomponent/categoriascomponent";
import Image from 'next/image';
import { db, collection, getDocs } from "../../../lib/firebase";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
        setError("Error al obtener los productos.");
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div>Cargando....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Categorias />
      <TitleCard>Productos</TitleCard>
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product) => {
          return (
            <div key={product.id} className="flex flex-col items-center p-4 border rounded shadow-md">
              <h1>{product.title}</h1>
              <p>{product.price}</p>
              <Image
                src={product.imageUrl || "/default-image.png"} // Asegúrate de que la propiedad imageUrl esté correcta
                alt={product.title}
                width={60}
                height={60}
              />
              <ButtonInformation idproducts={product.id} />
            </div>
          );
        })}
      </div>
    </>
  );
}
