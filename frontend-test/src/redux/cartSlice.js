import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        const newQuantity = Math.min(
          existingProduct.quantity + product.quantity,
          10
        );
        existingProduct.quantity = newQuantity;
      } else {
        state.cart.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartsSlice.actions;
export default cartsSlice.reducer;
