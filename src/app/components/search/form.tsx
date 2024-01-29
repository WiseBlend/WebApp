"use client";

import { useContext, useRef } from "react";
import { SearchContext } from "./context";
import { Product } from "./types";

const API_ENDPOINT = "/search.json?url=";

const parse = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((product) => {
      return {
        id: product.id || product.dupe_product_id,
        name: product.name || product.dupe_product,
        description: product.description || product.dupe_product_description,
        image: product.image || product.dupe_product_image,
        brand: product.brand || product.brand_name,
        price: product.price || product.dupe_price_in_dollar,
        size: product.size || product.dupe_size_without_unit,
        units: product.units || product.dupe_unit_of_size,
        link: product.link || product.dupe_shopping_link,
        ingredients: product.ingredients || product.key_ingredient_benefits,
        videos: product.videos || [
          product.dupe_video_reference_link_1,
          product.dupe_video_reference_link_2,
          product.dupe_video_reference_link_3,
        ],
      };
    }) as Product[];
  }
  return [];
};

export default function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setProducts } = useContext(SearchContext);

  const search = () => {
    const input = inputRef.current;

    if (input && input.value.trim()) {
      fetch(API_ENDPOINT + encodeURIComponent(input.value.trim()))
        .then((res) => res.json())
        .then((data) => {
          setProducts(parse(data));
          input.value = "";
        });
      input.value = "Loading...";
    }
  };

  return (
    <form className="flex grow px-4 lg:px-0 lg:ml-5" action={search}>
      <input
        ref={inputRef}
        type="url"
        required
        className="grow px-4 rounded-l-2xl"
        placeholder="Enter product URL"
        defaultValue="http://a.b.c"
      />
      <button type="submit" className="rounded-r-2xl"></button>
    </form>
  );
}
