import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useFetchToCart } from "../../../src/front-end-test/hooks/useFecthToCart";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useFetchDetail } from "../../../src/front-end-test/hooks/useFetchDetail";
import { ProductDetailsPage } from "../../../src/front-end-test/pages/ProductDetailsPage";
import { FrontEndTestContext } from "../../../src/front-end-test/context/FrontEndTestContext";

jest.mock("../../../src/front-end-test/hooks/useFetchDetail");
jest.mock("../../../src/front-end-test/hooks/useFecthToCart");

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useParams: () => ({ id: "1" }),
    useNavigate: () => jest.fn(),
    useLocation: () => ({ search: "?q=abc" }),
  };
});

const renderWithProviders = (ui, contextValue = { updateCartCount: jest.fn() }) => {
  return render(
    <FrontEndTestContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    </FrontEndTestContext.Provider>
  );
};

describe("ProductDetailsPage", () => {
  const mockDetail = {
    imgUrl: "image.jpg",
    brand: "Apple",
    model: "iPhone",
    options: {
      colors: [{ code: "black", name: "Negro" }],
      storages: [{ code: "128", name: "128GB" }],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows skeleton while loading", () => {
    useFetchDetail.mockReturnValue({ isLoading: true, detail: null, error: null });
    useFetchToCart.mockReturnValue({ addToCart: jest.fn() });

    renderWithProviders(<ProductDetailsPage />);
    expect(screen.getByTestId("skeleton-container")).toBeInTheDocument();
  });

  test("shows error message", () => {
    useFetchDetail.mockReturnValue({ isLoading: false, detail: null, error: "Error de red" });
    useFetchToCart.mockReturnValue({ addToCart: jest.fn() });

    renderWithProviders(<ProductDetailsPage />);
    expect(screen.getByText("Error de red")).toBeInTheDocument();
  });

  test("shows product details", () => {
    useFetchDetail.mockReturnValue({ isLoading: false, detail: mockDetail, error: null });
    useFetchToCart.mockReturnValue({ addToCart: jest.fn() });

    renderWithProviders(<ProductDetailsPage />);
    expect(screen.getByAltText("Apple iPhone")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Almacenamiento")).toBeInTheDocument();
  });

  test("alerts if no options selected", async () => {
    useFetchDetail.mockReturnValue({
      isLoading: false,
      detail: {
        ...mockDetail,
        options: { colors: [], storages: [] },
      },
      error: null,
    });
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    useFetchToCart.mockReturnValue({ addToCart: jest.fn() });

    renderWithProviders(<ProductDetailsPage />);
    fireEvent.click(screen.getByText("Añadir"));

    expect(alertMock).toHaveBeenCalledWith("Selecciona color y almacenamiento");
    alertMock.mockRestore();
  });

  test("adds to cart and updates counter", async () => {
    const addToCartMock = jest.fn().mockResolvedValue(3);
    const updateCartCountMock = jest.fn();

    useFetchDetail.mockReturnValue({ isLoading: false, detail: mockDetail, error: null });
    useFetchToCart.mockReturnValue({ addToCart: addToCartMock, addIsLoading: false });

    renderWithProviders(<ProductDetailsPage />, { updateCartCount: updateCartCountMock });

    fireEvent.click(screen.getByText("Añadir"));

    await waitFor(() => {
      expect(addToCartMock).toHaveBeenCalledWith("1", "black", "128");
      expect(updateCartCountMock).toHaveBeenCalledWith(3);
    });
  });

  test("shows error message if addToCart fails", async () => {
    useFetchDetail.mockReturnValue({ isLoading: false, detail: mockDetail, error: null });
    useFetchToCart.mockReturnValue({
      addToCart: jest.fn().mockResolvedValue(undefined),
      addIsLoading: false,
      addError: "Error al añadir",
    });

    renderWithProviders(<ProductDetailsPage />);
    fireEvent.click(screen.getByText("Añadir"));

    expect(await screen.findByText("Error al añadir")).toBeInTheDocument();
  });

  test("navigates to product list when clicking 'Volver", () => {
  const mockNavigate = jest.fn();

  jest.mock("react-router-dom", () => {
    const originalModule = jest.requireActual("react-router-dom");
    return {
      ...originalModule,
      useParams: () => ({ id: "1" }),
      useNavigate: () => mockNavigate,
      useLocation: () => ({ search: "?q=abc" }),
    };
  });

  useFetchDetail.mockReturnValue({ isLoading: false, detail: mockDetail, error: null });
  useFetchToCart.mockReturnValue({ addToCart: jest.fn(), addIsLoading: false });

  renderWithProviders(<ProductDetailsPage />);

  const backBtn = screen.getByText("← Volver");
  fireEvent.click(backBtn);

});

});
