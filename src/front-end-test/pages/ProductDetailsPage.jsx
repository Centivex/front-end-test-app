import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDetail } from "../hooks/useFetchDetail";
import { useFetchToCart } from "../hooks/useFecthToCart";
import { FrontEndTestContext } from "../context/FrontEndTestContext";

export const ProductDetailsPage = () => {
  const { id } = useParams();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const { detail, isLoading } = useFetchDetail(id);
  const { addToCart, count, addIsLoading, error } = useFetchToCart();
  const { updateCartCount } = useContext(FrontEndTestContext);

  const navigate = useNavigate();

  const goToProductList = () => {
    navigate("/list");
  };

  useEffect(() => {
    if (detail?.options?.colors?.length === 1) {
      setSelectedColor(detail.options.colors[0].code);
    }
    if (detail?.options?.storages?.length === 1) {
      setSelectedStorage(detail.options.storages[0].code);
    }
  }, [detail]);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage) {
      alert("Selecciona color y almacenamiento");
      return;
    }

    const newCount = await addToCart(id, selectedColor, selectedStorage);

    if (newCount !== undefined) {
      updateCartCount(newCount);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={goToProductList}
        className="mb-4 text-blue-600 hover:underline font-medium"
      >
        ← Volver
      </button>
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2  gap-y-6 gap-x-12">
        <div>
          <img
            src={detail.imgUrl}
            alt={`${detail.brand} ${detail.model}`}
            className="w-full rounded shadow"
          />
        </div>
        <div>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
            <li>
              <strong>Marca:</strong> {detail.brand}
            </li>
            <li>
              <strong>Modelo:</strong> {detail.model}
            </li>
            <li>
              <strong>Precio:</strong> {detail.price} €
            </li>
            <li>
              <strong>CPU:</strong> {detail.cpu}
            </li>
            <li>
              <strong>RAM:</strong> {detail.ram}
            </li>
            <li>
              <strong>Sistema Operativo:</strong> {detail.os}
            </li>
            <li>
              <strong>Resolución de pantalla:</strong>{" "}
              {detail.displayResolution}
            </li>
            <li>
              <strong>Batería:</strong> {detail.battery}
            </li>
            <li>
              <strong>Cámara Principal:</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                {(detail.primaryCamera ?? []).map((cam, index) => (
                  <li key={index}>{cam}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Cámara Frontal:</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                {(detail.secondaryCamera ?? []).map((cam, index) => (
                  <li key={index}>{cam}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Dimensiones:</strong> {detail.dimentions}
            </li>
            <li>
              <strong>Peso:</strong> {detail.weight}
            </li>
          </ul>
          <div className="mt-6 space-y-4">
            {/* Selector de color */}
            <div>
              <label className="block mb-1 font-medium">Color</label>
              <select
                className="w-full border rounded p-2"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {detail.options?.colors?.map((color) => (
                  <option key={color.code} value={color.code}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de almacenamiento */}
            <div>
              <label className="block mb-1 font-medium">Almacenamiento</label>
              <select
                className="w-full border rounded p-2"
                value={selectedStorage}
                onChange={(e) => setSelectedStorage(e.target.value)}
              >
                {detail.options?.storages?.map((storage) => (
                  <option key={storage.code} value={storage.code}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón Añadir */}
            <button
              disabled={addIsLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
