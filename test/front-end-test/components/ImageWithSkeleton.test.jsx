import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageWithSkeleton } from "../../../src/front-end-test/components/ImageWithSkeleton";

const mockSrc = "https://via.placeholder.com/150";
const mockAlt = "Test Image";

describe("ImageWithSkeleton", () => {
  test("renders skeleton before image loads", () => {
    render(<ImageWithSkeleton src={mockSrc} alt={mockAlt} />);

    const skeleton = screen.getByTestId("image-skeleton");
    const img = screen.getByRole("img");

    expect(skeleton).toBeInTheDocument();
    expect(img).toHaveClass("opacity-0");
  });

  test("hides skeleton after image loads", () => {
    render(<ImageWithSkeleton src={mockSrc} alt={mockAlt} />);
    const img = screen.getByRole("img");
    fireEvent.load(img);
    expect(img).toHaveClass("opacity-100");
  });

  test("renders with custom className and alt text", () => {
    render(
      <ImageWithSkeleton
        src={mockSrc}
        alt="My alt text"
        className="rounded-xl"
      />
    );

    const img = screen.getByAltText("My alt text");
    expect(img).toHaveClass("rounded-xl");
  });
});
