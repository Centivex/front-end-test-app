import React from "react";
import { render } from "@testing-library/react";
import { SkeletonCard } from "../../../src/front-end-test/components/SkeletonCard";

describe("SkeletonCard", () => {
  test("renders the skeleton card with correct structure and classes", () => {
    const { container } = render(<SkeletonCard />);

    const mainDiv = container.firstChild;

    expect(mainDiv).toHaveClass("animate-pulse", "border", "rounded", "p-4", "space-y-4");

    const blocks = mainDiv.querySelectorAll("div.bg-gray-300.rounded");
    expect(blocks.length).toBe(3);

    expect(mainDiv.querySelector("div.h-40")).toBeInTheDocument();
    expect(mainDiv.querySelector("div.h-6.w-3\\/4")).toBeInTheDocument();
    expect(mainDiv.querySelector("div.h-5.w-1\\/2")).toBeInTheDocument();
  });
});
