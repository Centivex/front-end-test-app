import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorScreen } from "../../../src/front-end-test/components/ErrorScreen";

describe("ErrorScreen", () => {
  const testMessage = "Hubo un error inesperado.";

  test("renders message correctly", () => {
    render(<ErrorScreen message={testMessage} />);
    expect(screen.getByText("¡Vaya! Ocurrió un problema")).toBeInTheDocument();
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test("renders retry button when onRetry is provided", () => {
    const mockRetry = jest.fn();

    render(<ErrorScreen message={testMessage} onRetry={mockRetry} />);

    const button = screen.getByRole("button", { name: /reintentar/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  test("does not render retry button when onRetry is not provided", () => {
    render(<ErrorScreen message={testMessage} />);
    const button = screen.queryByRole("button", { name: /reintentar/i });
    expect(button).not.toBeInTheDocument();
  });
});
