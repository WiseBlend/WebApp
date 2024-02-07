export type Product = {
  id: number; // product.dupe_product_id,
  name: string; //product.dupe_product,
  description: string; //product.dupe_product_description,
  image: string; //product.dupe_product_image,
  brand: string; //product.brand_name,
  price: number; // product.dupe_price_in_dollar,
  size: number; // product.dupe_size_without_unit,
  units: string; //product.dupe_unit_of_size,
  link: string; //product.dupe_shopping_link,
  ingredients: string; //product.key_ingredient_benefits,
  videos: string[]; // [dupe_video_reference_link_1, dupe_video_reference_link_2]
  justification: string; // product.dupe_justification

  // [key: string]: any;
};
