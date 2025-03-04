export const metadata = {
  title: "Valentino Maccaroni - Ecommerce | Proyecto Coderhouse",
  description:
    "Proyecto de ecommerce desarrollado por Valentino Maccaroni para Coderhouse. Encuentra los mejores productos con una experiencia de compra optimizada.",
  keywords: ["ecommerce", "coderhouse", "tienda online", "compras", "desarrollo web"],
  author: "Valentino Maccaroni",
  openGraph: {
    title: "Valentino Maccaroni - Ecommerce | Proyecto Coderhouse",
    description:
      "Un ecommerce moderno y eficiente creado por Valentino Maccaroni para Coderhouse.",
    type: "website",
    locale: "es_ES",
  },
};

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./globals.css";
import { CarritoProvider } from "./context/carritocontexto";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/tarjeta-de-debito.png" />
      </head>
      <body className="bg-background min-h-screen flex flex-col">
        <CarritoProvider>
          <Header />
          <main className="grow p-4">{children}</main>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
