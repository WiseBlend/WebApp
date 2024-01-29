"use client";

import Image from "next/image";
import { SearchForm } from "./search";

export default function Header() {
  return (
    <header className="lg:flex py-8">
      <a href="/" className="flex px-4 lg:px-0 mb-6 lg:mb-0 items-center">
        <Image
          src="/wiseblend-logo.svg"
          width={173}
          height={36}
          alt="Picture of the author"
        />
      </a>
      <SearchForm />
    </header>
  );
}
