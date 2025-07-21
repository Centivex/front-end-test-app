/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../../../src/front-end-test/components/ProductCard";
import { useNavigate } from "react-router-dom";

// Mock de useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ProductCard", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  const defaultProps = {
    id: "123",
    brand: "BrandX",
    model: "ModelY",
    price: 199,
    imgUrl: "http://example.com/image.jpg",
  };

  test("renders all product info correctly", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.brand)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.model)).toBeInTheDocument();
    expect(screen.getByText("199€")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultProps.imgUrl);
    expect(img).toHaveAttribute("alt", `${defaultProps.brand} ${defaultProps.model}`);
  });

  test("renders 'No disponible' if price is not provided", () => {
    render(<ProductCard {...defaultProps} price={null} />);
    expect(screen.getByText("No disponible")).toBeInTheDocument();
  });

  test("calls navigate with correct params when clicked", () => {
    render(<ProductCard {...defaultProps} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/list/${defaultProps.id}`, {
      state: { model: defaultProps.model },
    });
  });
});
