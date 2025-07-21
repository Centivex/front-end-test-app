import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductList } from "../../../src/front-end-test/components/ProductList";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../src/front-end-test/hooks/useFetchProducts", () => ({
  useFetchProducts: jest.fn(),
}));

jest.mock("../../../src/front-end-test/components/ProductCard", () => ({
  ProductCard: ({ brand, model }) => <div>{`${brand} ${model}`}</div>,
}));

jest.mock("../../../src/front-end-test/components/SkeletonCard", () => ({
  SkeletonCard: () => <div data-testid="skeleton-card">Loading...</div>,
}));

jest.mock("../../../src/front-end-test/components/ErrorScreen", () => ({
  ErrorScreen: ({ message }) => <div>{`Error: ${message}`}</div>,
}));

jest.mock("../../../src/front-end-test/components/Search", () => ({
  Search: ({ searchTerm, onSearchChange }) => (
    <input
      data-testid="search-input"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  ),
}));

const {
  useFetchProducts,
} = require("../../../src/front-end-test/hooks/useFetchProducts");

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays skeletons while loading", () => {
    useFetchProducts.mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(8);
  });

  test("renders error screen when fetch fails", () => {
    useFetchProducts.mockReturnValue({
      products: [],
      isLoading: false,
      error: "Error de red",
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error: Error de red/)).toBeInTheDocument();
  });

  test("displays product list", () => {
    useFetchProducts.mockReturnValue({
      products: [
        { id: 1, brand: "Apple", model: "iPhone 12" },
        { id: 2, brand: "Samsung", model: "Galaxy S21" },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByText("Apple iPhone 12")).toBeInTheDocument();
    expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
  });

  test("filters products by search term", () => {
    useFetchProducts.mockReturnValue({
      products: [
        { id: 1, brand: "Apple", model: "iPhone 12" },
        { id: 2, brand: "Samsung", model: "Galaxy S21" },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Samsung" } });

    expect(screen.queryByText("Apple iPhone 12")).not.toBeInTheDocument();
    expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
  });

  test("shows message when no results are found", () => {
    useFetchProducts.mockReturnValue({
      products: [
        { id: 1, brand: "Apple", model: "iPhone 12" },
        { id: 2, brand: "Samsung", model: "Galaxy S21" },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Xiaomi" } });

    expect(screen.getByText(/No se han encontrado marcas/)).toBeInTheDocument();
  });

  test("removes search params when input is cleared", () => {
    useFetchProducts.mockReturnValue({
      products: [
        { id: 1, brand: "Apple", model: "iPhone 12" },
        { id: 2, brand: "Samsung", model: "Galaxy S21" },
      ],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/list?search=Apple"]}>
        <ProductList />
      </MemoryRouter>
    );

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "" } });

    expect(screen.getByText("Apple iPhone 12")).toBeInTheDocument();
    expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
  });
});
