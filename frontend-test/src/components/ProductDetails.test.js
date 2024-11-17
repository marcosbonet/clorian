import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ProductDetails Component", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Test Product",
      description: "Test Description",
      validityDate: "2024-12-31",
      price: 99.99,
    },
    {
      id: 2,
      name: "Another Product",
      description: "Another Description",
      validityDate: "2024-12-31",
      price: 149.99,
    },
  ];

  const renderWithRouter = (id, products = mockProducts) => {
    return render(
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route
            path="/product/:id"
            element={<ProductDetails products={products} />}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  it("displays product details when product is found", async () => {
    renderWithRouter("1");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Test Product" })
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Valid Until:2024-12-31")).toBeInTheDocument();
    expect(screen.getByText("Price: $99.99")).toBeInTheDocument();
  });

  it("stays in loading state when product is not found", async () => {
    renderWithRouter("999");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles empty products array", () => {
    renderWithRouter("1", []);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles non-numeric id parameter", async () => {
    renderWithRouter("abc");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  describe("Responsive Layout", () => {
    it("renders with expected layout structure", async () => {
      renderWithRouter("1");

      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: "Test Product" })
        ).toBeInTheDocument();
      });

      expect(screen.getByTestId("product-container")).toHaveClass(
        "bg-white",
        "border",
        "rounded-lg",
        "shadow-lg"
      );

      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Test Product" })
      ).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByText("Valid Until:2024-12-31")).toBeInTheDocument();
      expect(screen.getByText("Price: $99.99")).toBeInTheDocument();
    });
  });
});
