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
        existingProduct.quantity = Math.min(
          existingProduct.quantity + product.quantity,
          10
        );
      } else {
        state.cart.push(product);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, clearCart } = cartsSlice.actions;
export default cartsSlice.reducer;
