"use client"
import Swal from 'sweetalert2';

export default function ButtonComprar({ produtoid }) {

    const guardarproducto = () => {
        const productoExistente = localStorage.getItem(`producto${produtoid}`);
        
        if (productoExistente) {
            Swal.fire({
                title: "Este producto ya está en el carrito",
                icon: "info",
                draggable: true
            });
        } else {
            localStorage.setItem(`producto${produtoid}`, produtoid);
            Swal.fire({
                title: "Producto Agregado",
                icon: "success",
                draggable: true
            });
        }
    };

    return (
        <button
            onClick={guardarproducto}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
            Comprar ahora
        </button>
    );
}
