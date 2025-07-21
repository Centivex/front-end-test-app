/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductDetailList } from "../../../src/front-end-test/components/ProductDetailList";

describe("ProductDetailList", () => {
  const baseDetail = {
    brand: "MarcaTest",
    model: "ModeloTest",
    price: 123,
    cpu: "Intel i7",
    ram: "16GB",
    os: "Windows 10",
    displayResolution: "1920x1080",
    battery: "4000mAh",
    dimentions: "15x10x1 cm",
    weight: "1.5kg",
  };

  test("renders all simple detail fields", () => {
  render(<ProductDetailList detail={baseDetail} />);

  const expectField = (label, value) => {
    const li = screen.getByText((_, element) =>
      element.tagName.toLowerCase() === "li" &&
      element.textContent.includes(label) &&
      element.textContent.includes(value)
    );
    expect(li).toBeInTheDocument();
  };

  expectField("Marca:", "MarcaTest");
  expectField("Modelo:", "ModeloTest");
  expectField("Precio:", "123 €");
  expectField("CPU:", "Intel i7");
  expectField("RAM:", "16GB");
  expectField("Sistema Operativo:", "Windows 10");
  expectField("Resolución de pantalla:", "1920x1080");
  expectField("Batería:", "4000mAh");
  expectField("Dimensiones:", "15x10x1 cm");
  expectField("Peso:", "1.5kg");
});


  test("renders primaryCamera as string", () => {
    render(<ProductDetailList detail={{ ...baseDetail, primaryCamera: "12MP" }} />);
    expect(screen.getByText("Cámara Principal:")).toBeInTheDocument();
    expect(screen.getByText("12MP")).toBeInTheDocument();
  });

  test("renders primaryCamera as array with valid entries", () => {
    render(<ProductDetailList detail={{ ...baseDetail, primaryCamera: ["12MP", "8MP"] }} />);
    expect(screen.getByText("Cámara Principal:")).toBeInTheDocument();
    expect(screen.getByText("12MP")).toBeInTheDocument();
    expect(screen.getByText("8MP")).toBeInTheDocument();
  });

  test("does not render empty strings in primaryCamera array", () => {
    render(<ProductDetailList detail={{ ...baseDetail, primaryCamera: ["", "  "] }} />);
    expect(screen.queryByText("Cámara Principal:")).not.toBeInTheDocument();
  });

  test("renders secondaryCmera as string", () => {
    render(<ProductDetailList detail={{ ...baseDetail, secondaryCmera: "5MP" }} />);
    expect(screen.getByText("Cámara Frontal:")).toBeInTheDocument();
    expect(screen.getByText("5MP")).toBeInTheDocument();
  });

  test("renders secondaryCmera as array", () => {
    render(<ProductDetailList detail={{ ...baseDetail, secondaryCmera: ["2MP", "1MP"] }} />);
    expect(screen.getByText("Cámara Frontal:")).toBeInTheDocument();
    expect(screen.getByText("2MP")).toBeInTheDocument();
    expect(screen.getByText("1MP")).toBeInTheDocument();
  });

  test("does not render secondaryCmera if empty or missing", () => {
    render(<ProductDetailList detail={baseDetail} />);
    expect(screen.queryByText("Cámara Frontal:")).not.toBeInTheDocument();

    render(<ProductDetailList detail={{ ...baseDetail, secondaryCmera: ["", " "] }} />);
    expect(screen.queryByText("Cámara Frontal:")).not.toBeInTheDocument();
  });

  test("does not render fields if they are missing or falsy", () => {
    render(<ProductDetailList detail={{}} />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

});
