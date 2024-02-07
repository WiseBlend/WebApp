"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { Card } from "../card";
import { SearchContext } from "./context";
import { Product } from "./types";

const heading = Playfair_Display({ subsets: ["latin"] });

export default function SearchResults() {
  const { products } = useContext(SearchContext);
  const [product, setProduct] = useState<Product>(products[0]);

  return (
    <div className="products mt-6 lg:mt-12 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row lg:gap-x-8">
        <div
          className="min-h-64 bg-white border border-gray-300 rounded-lg bg-contain bg-no-repeat bg-center grow basis-full"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        <div className="grow basis-full mt-4 lg:mt-0">
          <h2 className={`text-6xl font-semibold ${heading.className}`}>
            {product.brand}
          </h2>
          <h3 className="text-xl font-normal mt-4 mb-6">{product.name}</h3>
          <p className="text-base font-normal">{product.description}</p>
          <div className="columns-2 mt-6 flex items-center">
            <div className="text-orange-600 text-3xl font-bold">
              ${product.price} /{product.size} {product.units}
            </div>
            <div className="ml-6">
              <a
                className="p-4 rounded-md bg-cyan-500 text-white text-base font-semibold"
                href={product.link}
                target="_blank"
              >
                Buy Now
              </a>
            </div>
          </div>
          <ProductAlternatives
            products={products}
            product={product}
            setProduct={setProduct}
          />
        </div>
      </div>

      <Card title="Active Ingredients">
        <div>{product.ingredients}</div>
      </Card>
      <Card title="Justification">
        <div>{product.justification}</div>
      </Card>

      <SocialMedia product={product} />
    </div>
  );
}

const SocialMedia = ({ product }: { product: Product }) => {
  const videos = product.videos
    .map((url) => {
      if (url && url.startsWith("http")) {
        try {
          // "https://www.youtube.com/shorts/qwerty",
          let videoId: string | null = url.split("/shorts/")[1];
          if (!videoId) {
            // "https://www.youtube.com/watch?v=aaa&pp=bbb"
            videoId = new URLSearchParams(url.split("?")[1]).get("v");
          }
          const src = "https://www.youtube.com/embed/" + videoId;
          return (
            <iframe
              key={videoId}
              className="m-6 w-full lg:w-3/5 min-h-96 rounded-xl"
              allowFullScreen
              src={src}
            ></iframe>
          );
        } catch (ex) {}
      }
      return null;
    })
    .filter((video) => video !== null);

  if (videos.length) {
    return (
      <Card title="Social Media">
        <div className="flex flex-col items-center">{videos}</div>
      </Card>
    );
  }
  return null;
};

const ProductAlternatives: any = ({
  products,
  product,
  setProduct,
}: {
  products: Product[];
  product: Product;
  setProduct: Dispatch<SetStateAction<Product>>;
}) => (
  <div className="mt-6">
    <strong>Other Great Alternatives</strong>
    <div className="mt-3 flex gap-x-4">
      {products.map((alternative) =>
        alternative.id !== product.id ? (
          <ProductAlternative
            key={alternative.id}
            product={alternative}
            setProduct={setProduct}
          />
        ) : null
      )}
    </div>
  </div>
);

const ProductAlternative = ({
  product,
  setProduct,
}: {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product>>;
}) => {
  const inlineStyle = { backgroundImage: `url(${product.image})` };
  return (
    <div
      className="bg-white border border-gray-300 outline outline-0 hover:border-transparent hover:outline-2 hover:outline-cyan-500 rounded-lg px-3 py-5 flex grow basis-full cursor-pointer items-center"
      onClick={() => {
        setProduct(product);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onKeyUp={(e) => e.key === "Enter" && setProduct(product)}
      tabIndex={0}
    >
      <div
        className="basis-1/3 h-full bg-contain bg-no-repeat bg-center"
        style={inlineStyle}
      ></div>
      <div className="py-5 grow">
        <h3 className="text-xl font-semibold">{product.brand}</h3>
        <div className="text-orange-600 text-xl font-bold">
          ${product.price} /{product.size} {product.units}
        </div>
      </div>
    </div>
  );
};
