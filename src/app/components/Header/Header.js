"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import  {useContext}  from 'react';
import { CarritoContext } from "../../context/carritocontexto";

export default function Header() {

  
  const { cantidad, setCantidad } = useContext(CarritoContext);


  return (
    <header className="bg-black text-white p-4 flex justify-between">
      <h1>ecommerce-valentinomaccaroni</h1>
      <nav className="flex gap-4">
        <Link href="/">home</Link>
        <Link href="/admin">admin</Link>
        <Link href="/Productos">productos</Link>
        <Link href="/Carrito" className="flex items-center gap-1">
          <ShoppingCart className="w-5 h-5 text-white" />
          <span>{cantidad}</span>
        </Link>
      </nav>
    </header>
  );
}
