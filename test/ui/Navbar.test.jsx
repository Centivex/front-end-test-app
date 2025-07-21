import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../src/ui/Navbar";
import { loadDetailFromCache } from "../../src/storage/Cache";
import { FrontEndTestContext } from "../../src/front-end-test/context/FrontEndTestContext";

jest.mock("../../src/storage/Cache", () => ({
  loadDetailFromCache: jest.fn(),
}));

const customRender = (ui, { route = "/list", cartCount = 3, state = {} } = {}) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[{ pathname: route, state }]}>
      <FrontEndTestContext.Provider value={{ cartCount }}>
        {children}
      </FrontEndTestContext.Provider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper });
};

describe("Navbar", () => {
  beforeEach(() => {
  jest.clearAllMocks();
});

test("displays the title and cart counter", () => {
  customRender(<Navbar />, { route: "/list", cartCount: 5 });
  expect(screen.getByText("📱 MyPhoneStore")).toBeInTheDocument();
  expect(screen.getByText("🛒")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
});

test("displays breadcrumbs with model from location.state", () => {
  customRender(<Navbar />, {
    route: "/list/abc123",
    state: { model: "iPhone 15" },
  });
  expect(screen.getByText("productos")).toBeInTheDocument();
  expect(screen.getByText("iPhone 15")).toBeInTheDocument();
});

test("displays breadcrumbs with model from cache if no state", () => {
  loadDetailFromCache.mockReturnValue({ model: "Galaxy S22" });

  customRender(<Navbar />, {
    route: "/list/xyz789",
  });

  expect(loadDetailFromCache).toHaveBeenCalledWith("xyz789");
  expect(screen.getByText("productos")).toBeInTheDocument();
  expect(screen.getByText("Galaxy S22")).toBeInTheDocument();
});

test("does not display breadcrumbs when on root path", () => {
  customRender(<Navbar />, { route: "/" });
  expect(screen.queryByText("productos")).not.toBeInTheDocument();
});

});
