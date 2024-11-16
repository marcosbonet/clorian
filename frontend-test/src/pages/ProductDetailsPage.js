import React from "react";
import ProductDetails from "../components/ProductDetails";
import productsData from "../assets/product.json";

const ProductsDetailsPage = () => {
  return <ProductDetails products={productsData} />;
};

export default ProductsDetailsPage;
