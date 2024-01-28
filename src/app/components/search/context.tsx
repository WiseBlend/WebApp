"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Product } from "./types";

export const SearchContext = createContext({
  products: [] as Product[],
  setProducts: (() => {}) as Dispatch<SetStateAction<Product[]>>,
});

export const SearchProvider = ({ children }: { children: any }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <SearchContext.Provider value={{ products, setProducts }}>
      {children}
    </SearchContext.Provider>
  );
};
