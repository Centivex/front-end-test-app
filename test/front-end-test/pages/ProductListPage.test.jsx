import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductListPage } from "../../../src/front-end-test/pages/ProductListPage";

jest.mock("../../../src/front-end-test/components/ProductList", () => ({
  ProductList: () => <div data-testid="mock-product-list">Mock Product List</div>
}));

describe("ProductListPage", () => {
  test("renders the ProductList component", () => {
    render(<ProductListPage />);
    expect(screen.getByTestId("mock-product-list")).toBeInTheDocument();
    expect(screen.getByText("Mock Product List")).toBeInTheDocument();
  });
});
