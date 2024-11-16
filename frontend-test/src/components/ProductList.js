import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const ProductList = React.memo(({ products, addToCart }) => {
  const [search, setSearch] = useState("");

  const filterProducts = useMemo(() => {
    if (!search) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);
  const sortedProduct = useMemo(() => {
    return filterProducts.sort((a, b) => a.name.localeCompare(b.name));
  }, [filterProducts]);

  const currentDay = dayjs();

  const handlerSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={handlerSearchChange}
            placeholder="Search events..."
            className="flex-1 p-3 border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link
            to="/cart"
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            View Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {sortedProduct.map((product) => {
            const isExpired = dayjs(product.validUntil).isBefore(currentDay);

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Valid Until:{" "}
                    {dayjs(product.validUntil).format("YYYY-MM-DD")}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-4">
                    ${product.price.toFixed(2)}
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <select
                        className={`border rounded px-3 py-2 text-sm w-20 ${
                          isExpired
                            ? "bg-gray-100 text-gray-400"
                            : "bg-white text-gray-700"
                        }`}
                        disabled={isExpired}
                        defaultValue="1"
                      >
                        {[...Array(5).keys()].map((n) => (
                          <option key={n + 1} value={n + 1}>
                            {n + 1}
                          </option>
                        ))}
                      </select>

                      {!isExpired && (
                        <button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                            })
                          }
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
                      >
                        View Details
                      </Link>

                      {isExpired && (
                        <span className="flex-1 bg-gray-400 text-white font-medium py-2 px-4 rounded-lg text-center">
                          Expired
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
export default ProductList;
