import React from "react";
import ProductList from "./components/ProductList";
import productsData from "../src/assets/product.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import ProductDetails from "./components/ProductDetails";

function App() {
  // const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handlerAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100  flex flex-col justify-center items-center py-6 px-4 sm:px-6 lg:px8">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Event Tickets
          </h1>
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  products={productsData}
                  addToCart={handlerAddToCart}
                ></ProductList>
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetails products={productsData} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
