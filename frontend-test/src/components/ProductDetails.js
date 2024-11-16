import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.id === parseInt(id)
    );

    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [id, products]);
  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white border rounded-lg shadow-lg p-6 max-w-md w-full">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mb-4 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400 transition-colors"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg text-gray-800">
          Valid Until:{product.validityDate}
        </p>
        <p className="text-lg text-green-600">
          Price: ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
