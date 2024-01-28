"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { SearchContext } from "./context";
import { Product } from "./types";

const heading = Playfair_Display({ subsets: ["latin"] });

export default function SearchResults() {
  const { products } = useContext(SearchContext);
  const [product, setProduct] = useState<Product>(products[0]);
  const inlineStyle = { backgroundImage: `url(${product.dupe_product_image})` };

  return (
    <div className="products mt-12">
      <div className="flex gap-x-8">
        <div
          className="bg-white border border-gray-300 rounded-lg bg-contain bg-no-repeat bg-center grow basis-full"
          style={inlineStyle}
        ></div>
        <div className="grow basis-full">
          <h2 className={`text-6xl font-semibold ${heading.className}`}>
            {product.brand_name}
          </h2>
          <h3 className="text-xl font-normal mt-4 mb-6">
            {product.dupe_product}
          </h3>
          <p className="text-base font-normal">
            {product.dupe_product_description}
          </p>
          <div className="columns-2 mt-6 flex items-center">
            <div className="text-orange-600 text-3xl font-bold">
              ${product.dupe_price_in_dollar} /{product.dupe_size_without_unit}{" "}
              {product.dupe_unit_of_size}
            </div>
            <div className="ml-6">
              <a
                className="p-4 rounded-md bg-cyan-500 text-white text-base font-semibold"
                href={product.dupe_shopping_link}
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
    </div>
  );
}

const ProductAlternatives = ({
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
        alternative.dupe_product_id !== product.dupe_product_id ? (
          <ProductAlternative
            key={alternative.dupe_product_id}
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
  const inlineStyle = { backgroundImage: `url(${product.dupe_product_image})` };
  return (
    <div
      className="bg-white border border-gray-300 rounded-lg px-3 py-5 flex grow basis-full cursor-pointer"
      onClick={() => setProduct(product)}
    >
      <div
        className="basis-1/3 bg-contain bg-no-repeat bg-center"
        style={inlineStyle}
      ></div>
      <div className="py-5 grow">
        <h3 className="text-xl font-semibold">{product.brand_name}</h3>
        <div className="text-orange-600 text-xl font-bold">
          ${product.dupe_price_in_dollar} /{product.dupe_size_without_unit}{" "}
          {product.dupe_unit_of_size}
        </div>
      </div>
    </div>
  );
};
