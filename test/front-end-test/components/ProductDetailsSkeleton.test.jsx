import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductDetailsSkeleton } from "../../../src/front-end-test/components/ProductDetailsSkeleton";

describe("ProductDetailsSkeleton", () => {
  test("renders skeleton layout correctly", () => {
    render(<ProductDetailsSkeleton />);

    const container = screen.getByTestId("skeleton-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("animate-pulse");

    const skeletonBlocks = container.querySelectorAll(".bg-gray-300, .bg-gray-400");
    expect(skeletonBlocks.length).toBeGreaterThanOrEqual(8);
  });
});
