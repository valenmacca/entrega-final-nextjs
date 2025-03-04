"use client"
import { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
const [cantidad, setCantidad] = useState(0);

return (
    <CarritoContext.Provider value={{ cantidad, setCantidad }}>
    {children}
    </CarritoContext.Provider>
);
};

