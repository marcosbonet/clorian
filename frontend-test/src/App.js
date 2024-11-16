import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const ProductsDetailsPage = React.lazy(() =>
  import("./pages/ProductDetailsPage")
);
const ProductsListPage = React.lazy(() => import("./pages/ProductListPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100  flex flex-col justify-center items-center py-6 px-4 sm:px-6 lg:px8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-center items-center w-full ">
            <h1 className="text-5xl font-bold text-gray-800">Event Tickets</h1>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProductsListPage />} />
              <Route path="/product/:id" element={<ProductsDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
