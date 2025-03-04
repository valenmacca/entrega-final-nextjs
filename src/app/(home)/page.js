'use client';
import { useEffect, useState } from "react";
import TitleCard from "../components/TitleCard/title";
import ButtonInformation from "../components/ButtonInformation/ButtonInformation";
import { Lock, Plane } from "lucide-react";
import Image from 'next/image';
import { db, collection, getDocs } from "../../../lib/firebase";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
        setError("Error al obtener los productos.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

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
          {loading ? (
            <div>Cargando productos...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.map((product) => {
                return (
                  <div key={product.id} className="flex flex-col items-center p-4 border rounded shadow-md">
                    <h1>{product.title}</h1>
                    <p>{product.price}</p>
                    <Image
                      src={product.imageUrl || "/default-image.png"}  // Valor predeterminado si no existe imageUrl
                      alt={product.title}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px]"
                    />
                    <ButtonInformation idproducts={product.id} />
                  </div>
                );
            })
          )}
        </div>
      </div>
    </div>
  );
}
