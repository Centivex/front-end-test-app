/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OptionSelector } from "../../../src/front-end-test/components/OptionSelector";

describe("OptionSelector", () => {
  const label = "Choose an option";
  const options = [
    { code: "opt1", name: "Option 1" },
    { code: "opt2", name: "Option 2" },
  ];
  const selected = "opt1";
  const onSelect = jest.fn();

  beforeEach(() => {
    onSelect.mockClear();
  });

  test("renders label correctly", () => {
    render(
      <OptionSelector
        label={label}
        options={options}
        selected={selected}
        onSelect={onSelect}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("renders all options as buttons", () => {
    render(
      <OptionSelector
        label={label}
        options={options}
        selected={selected}
        onSelect={onSelect}
      />
    );
    options.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  test("applies selected styles to the selected option", () => {
    render(
      <OptionSelector
        label={label}
        options={options}
        selected={selected}
        onSelect={onSelect}
      />
    );
    const selectedButton = screen.getByText("Option 1");
    expect(selectedButton).toHaveClass("border-blue-600");
    expect(selectedButton).toHaveClass("bg-blue-100");

    const notSelectedButton = screen.getByText("Option 2");
    expect(notSelectedButton).toHaveClass("border-gray-300");
    expect(notSelectedButton).toHaveClass("bg-white");
  });

  test("calls onSelect with correct code when option is clicked", () => {
    render(
      <OptionSelector
        label={label}
        options={options}
        selected={selected}
        onSelect={onSelect}
      />
    );
    const buttonToClick = screen.getByText("Option 2");
    fireEvent.click(buttonToClick);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("opt2");
  });
});
