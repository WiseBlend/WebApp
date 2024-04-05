"use client";

import { useContext, useRef } from "react";
import { SearchContext } from "./context";
import { Product } from "./types";

const API_URL_DEV = "http://localhost:3001";
const API_URL_PROD = "https://api.wiseblend.ai";
const API_ENDPOINT = "/dupes/search";
const DEFAULT_URL = "https://www.obagi.com/products/professional-c-serum-20";

export default function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const { setProducts } = useContext(SearchContext);

  const search = () => {
    const input = inputRef.current;
    const image = imageRef.current;
    const host = location.hostname === "localhost" ? API_URL_DEV : API_URL_PROD;
    const endpoint = host + API_ENDPOINT + "?url=";
    const url = input && input.value.trim();
    const img = image && image.files && image.files[0];

    if (input) input.value = "Loading...";

    const reset = () => {
      if (input) input.value = DEFAULT_URL;
      if (image) image.value = "";
    };

    if (img) {
      const data = new FormData();
      data.append("image", img);
      fetch(endpoint, { method: "POST", body: data })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.dupes || []);
          reset();
        });
    } else if (url) {
      fetch(endpoint + encodeURIComponent(url))
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.dupes || []);
          reset();
          input.value = url;
        });
    } else {
      reset();
    }
  };

  return (
    <form className="flex grow px-4 lg:px-0 lg:ml-5" action={search}>
      <input
        ref={inputRef}
        type="url"
        className="grow px-4 rounded-l-2xl"
        placeholder="Enter product URL or product screenshot"
        defaultValue={DEFAULT_URL}
      />
      <input
        ref={imageRef}
        type="file"
        className="pr-2"
        role="button"
        onChange={search}
        accept="image/*"
        title="Upload screenshot"
      />
      <button type="submit" className="rounded-r-2xl"></button>
    </form>
  );
}
