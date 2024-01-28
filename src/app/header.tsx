'use client';

import Image from "next/image";
import { FormEvent } from "react";

export default function Header() {
  const onSubmit = (e: FormEvent) => {
    alert("Something really cool is coming soon!");
    e.preventDefault();
    return false;
  };

  return (
    <header className="flex py-8">
      <a href="/" className="flex items-center">
        <Image
          src="/wiseblend-logo.svg"
          width={173}
          height={36}
          alt="Picture of the author"
        />
      </a>
      <form className="flex grow ml-5" onSubmit={onSubmit}>
        <input
          type="url"
          required
          className="grow px-4"
          placeholder="Enter product URL"
        />
        <button>&nbsp;</button>
      </form>
    </header>
  );
}
