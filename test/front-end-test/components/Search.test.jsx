import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "../../../src/front-end-test/components/Search";

describe("Search component", () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    mockOnSearchChange.mockClear();
  });

  it("renders the input with the correct placeholder and value", () => {
    render(<Search searchTerm="laptop" onSearchChange={mockOnSearchChange} />);
    
    const input = screen.getByPlaceholderText("Búsqueda por modelo o marca...");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("laptop");
  });

  it("calls onSearchChange when the user types", () => {
    render(<Search searchTerm="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText("Búsqueda por modelo o marca...");
    fireEvent.change(input, { target: { value: "Dell" } });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchChange).toHaveBeenCalledWith("Dell");
  });
});
