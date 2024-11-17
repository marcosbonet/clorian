import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Cart";
import cartReducer from "../redux/cartSlice";
import dayjs from "dayjs";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        cart: initialState,
      },
    },
  });
};

describe("Cart Component", () => {
  const mockCartItems = {
    cart: [
      {
        id: 1,
        name: "Test Product 1",
        price: 10,
        quantity: 2,
        validUntil: dayjs().add(1, "day").format("YYYY-MM-DD"),
      },
      {
        id: 2,
        name: "Test Product 2",
        price: 15,
        quantity: 1,
        validUntil: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
      },
    ],
  };

  const renderWithProvider = (component, store) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("renders empty cart message when cart is empty", () => {
    const store = createTestStore({ cart: [] });
    renderWithProvider(<Cart />, store);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("renders cart items correctly", () => {
    const store = createTestStore(mockCartItems);
    renderWithProvider(<Cart />, store);

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.getByText("Price: $10")).toBeInTheDocument();
    expect(screen.getByText("Price: $15")).toBeInTheDocument();
  });

  it("calculates total correctly", () => {
    const store = createTestStore(mockCartItems);
    renderWithProvider(<Cart />, store);

    expect(screen.getByText("$35.00")).toBeInTheDocument();
  });

  it("shows expired message for expired products", () => {
    const store = createTestStore(mockCartItems);
    renderWithProvider(<Cart />, store);

    expect(screen.getByText("This product is expired")).toBeInTheDocument();
  });

  it("navigates back when back button is clicked", () => {
    const store = createTestStore(mockCartItems);
    renderWithProvider(<Cart />, store);

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
