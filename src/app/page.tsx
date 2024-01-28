"use client";

import { useContext } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/hero";
import { SearchContext, SearchResults } from "./components/search";

export default function Home() {
  const { products } = useContext(SearchContext);

  return (
    <div className="flex flex-col max-w-5xl min-h-screen mx-auto">
      <Header />
      <main>{products.length ? <SearchResults /> : <Hero />}</main>
      {products.length ? <Footer /> : null}
    </div>
  );
}
