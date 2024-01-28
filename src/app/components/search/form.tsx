"use client";

import { useContext, useRef } from "react";
import { SearchContext } from "./context";

const API_ENDPOINT = "/search.json?url=";

export default function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setProducts } = useContext(SearchContext);

  const search = () => {
    const input = inputRef.current;

    if (input && input.value.trim()) {
      fetch(API_ENDPOINT + encodeURIComponent(input.value.trim()))
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          input.value = "";
        });
      input.value = "Loading...";
    }
  };

  return (
    <form className="flex grow ml-5" action={search}>
      <input
        ref={inputRef}
        type="url"
        required
        className="grow px-4 rounded-l-2xl"
        placeholder="Enter product URL"
      />
      <button type="submit" className="rounded-r-2xl">&nbsp;</button>
    </form>
  );
}
