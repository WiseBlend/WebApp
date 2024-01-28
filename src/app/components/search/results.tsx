"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Playfair_Display } from "next/font/google";
import { Card } from "../card";
import { SearchContext } from "./context";
import { Product } from "./types";

const heading = Playfair_Display({ subsets: ["latin"] });

export default function SearchResults() {
  const { products } = useContext(SearchContext);
  const [product, setProduct] = useState<Product>(products[0]);

  return (
    <div className="products mt-12">
      <div className="flex gap-x-8">
        <div
          className="bg-white border border-gray-300 rounded-lg bg-contain bg-no-repeat bg-center grow basis-full"
          style={{ backgroundImage: `url(${product.dupe_product_image})` }}
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

      <Card title="Active Ingredients">
        <div>{product.key_ingredient_benefits}</div>
      </Card>

      <SocialMedia product={product} />
    </div>
  );
}

const SocialMedia = ({ product }: { product: Product }) => {
  const videos = [
    product.dupe_video_reference_link_1,
    product.dupe_video_reference_link_2,
    product.dupe_video_reference_link_3,
  ]
    .map((url) => {
      if (url && url.startsWith("http")) {
        try {
          // "https://www.youtube.com/shorts/qwerty",
          let videoId = url.split("/shorts/")[1];
          if (!videoId) {
            // "https://www.youtube.com/watch?v=aaa&pp=bbb"
            videoId = new URLSearchParams(url.split("?")[1]).get("v");
          }
          const src = "https://www.youtube.com/embed/" + videoId;
          return (
            <iframe
              key={videoId}
              className="m-6 w-3/5 min-h-96 rounded-xl"
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
        <div className="flex flex-col items-center">
          {videos}
        </div>
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
      className="bg-white border border-gray-300 outline outline-0 hover:border-transparent hover:outline-2 hover:outline-cyan-500 rounded-lg px-3 py-5 flex grow basis-full cursor-pointer"
      onClick={() => setProduct(product)}
      onKeyUp={(e) => e.key === "Enter" && setProduct(product)}
      tabIndex={0}
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
