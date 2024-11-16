import React from "react";
import productsData from "../assets/product.json";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProductList from "../components/ProductList";

const ProductsListPage = () => {
  const dispatch = useDispatch();

  const handlerAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return <ProductList products={productsData} addToCart={handlerAddToCart} />;
};

export default ProductsListPage;
