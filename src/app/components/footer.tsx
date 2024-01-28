import { Playfair_Display } from "next/font/google";

const heading = Playfair_Display({ subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className="bg-white p-6 mt-6 text-sm">
      <h3 className={`text-3xl font-medium ${heading.className}`}>
        Revolutionize the way you shop for Beauty.
      </h3>
      <div className="mt-3">© 2024 BeautyBuy™. All Rights Reserved.</div>
    </footer>
  );
}
