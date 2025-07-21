import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FrontEndTestRoutes } from "../../../src/front-end-test/routes/FrontEndTestRoutes";

jest.mock("../../../src/front-end-test/pages/ProductListPage", () => ({
  ProductListPage: () => <div data-testid="product-list-page">ProductListPage</div>,
}));

jest.mock("../../../src/front-end-test/pages/ProductDetailsPage", () => ({
  ProductDetailsPage: () => <div data-testid="product-details-page">ProductDetailsPage</div>,
}));

jest.mock("../../../src/ui/Navbar", () => ({
  Navbar: () => <nav data-testid="navbar">Mock Navbar</nav>,
}));

describe("FrontEndTestRoutes", () => {
  test("renders the Navbar", () => {
  render(
    <MemoryRouter initialEntries={["/list"]}>
      <FrontEndTestRoutes />
    </MemoryRouter>
  );
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

test("redirects to /list by default", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <FrontEndTestRoutes />
    </MemoryRouter>
  );
  expect(screen.getByTestId("product-list-page")).toBeInTheDocument();
});

test("renders ProductListPage at /list", () => {
  render(
    <MemoryRouter initialEntries={["/list"]}>
      <FrontEndTestRoutes />
    </MemoryRouter>
  );
  expect(screen.getByTestId("product-list-page")).toBeInTheDocument();
});

test("renders ProductDetailsPage at /list/:id", () => {
  render(
    <MemoryRouter initialEntries={["/list/abc123"]}>
      <FrontEndTestRoutes />
    </MemoryRouter>
  );
  expect(screen.getByTestId("product-details-page")).toBeInTheDocument();
});
});
