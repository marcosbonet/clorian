import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems);
  const currentDay = dayjs();
  const navigate = useNavigate();
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const total = cartItems.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-4 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400 transition-colors"
      >
        Back
      </button>
      {cartItems.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.cart.map((item) => {
              const isExpired = dayjs(item.validUntil).isBefore(currentDay);

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Price: ${item.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Valid Until: {dayjs(item.validUntil).format("YYYY-MM-DD")}
                    </p>
                    {isExpired && (
                      <p className="text-sm text-red-500">
                        This product is expired
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-800">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-800">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-lg font-semibold">
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleClearCart}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
