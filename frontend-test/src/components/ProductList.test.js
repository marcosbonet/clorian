import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import dayjs from "dayjs";
import ProductList from "./ProductList";

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    price: 99.99,
    validUntil: dayjs().add(1, "day").format("YYYY-MM-DD"),
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    price: 149.99,
    validUntil: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  },
];

const mockAddToCart = jest.fn();

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProductList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all products correctly", () => {
    renderWithRouter(
      <ProductList products={mockProducts} addToCart={mockAddToCart} />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("$149.99")).toBeInTheDocument();
  });

  test("search functionality filters products correctly", () => {
    renderWithRouter(
      <ProductList products={mockProducts} addToCart={mockAddToCart} />
    );

    const searchInput = screen.getByPlaceholderText("Search events...");
    fireEvent.change(searchInput, { target: { value: "Product 1" } });

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });

  test("expired products show Expired label and disable Add to Cart", () => {
    renderWithRouter(
      <ProductList products={mockProducts} addToCart={mockAddToCart} />
    );

    expect(screen.getByText("Expired")).toBeInTheDocument();

    const addToCartButtons = screen.getAllByText("Add to Cart");
    expect(addToCartButtons).toHaveLength(1);
  });

  test("Add to Cart button calls addToCart function with correct parameters", () => {
    renderWithRouter(
      <ProductList products={mockProducts} addToCart={mockAddToCart} />
    );

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      name: "Product 1",
      price: 99.99,
      quantity: 1,
    });
  });

  test("quantity selector works correctly", () => {
    renderWithRouter(
      <ProductList products={mockProducts} addToCart={mockAddToCart} />
    );

    const quantitySelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(quantitySelect, { target: { value: "3" } });

    expect(quantitySelect.value).toBe("3");
  });

  test("View Details link has correct URL", () => {
    renderWithRouter(
      <ProductList products={mockProducts} addToCart={mockAddToCart} />
    );

    const viewDetailsLinks = screen.getAllByText("View Details");
    expect(viewDetailsLinks[0]).toHaveAttribute("href", "/product/1");
  });

  test("View Cart link exists and has correct URL", () => {
    renderWithRouter(
      <ProductList products={mockProducts} addToCart={mockAddToCart} />
    );

    const viewCartLink = screen.getByText("View Cart");
    expect(viewCartLink).toHaveAttribute("href", "/cart");
  });
});
