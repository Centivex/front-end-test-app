import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetchDetail } from "../hooks/useFetchDetail";
import { useFetchToCart } from "../hooks/useFecthToCart";
import { ProductDetailList } from "../components/ProductDetailList";
import { OptionSelector } from "../components/OptionSelector";
import { ErrorScreen } from "../components/ErrorScreen";
import { ProductDetailsSkeleton } from "../components/ProductDetailsSkeleton";
import { FrontEndTestContext } from "../context/FrontEndTestContext";

export const ProductDetailsPage = () => {
  const { id } = useParams();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const { detail, isLoading, error } = useFetchDetail(id);
  const { addToCart, addIsLoading, addError } = useFetchToCart();
  const { updateCartCount } = useContext(FrontEndTestContext);

  const navigate = useNavigate();
  const location = useLocation();

  const goToProductList = () => {
  navigate("/list" + location.search);
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

  if (isLoading) return <ProductDetailsSkeleton />;

  if (error)
    return (
      <ErrorScreen message={error} onRetry={() => window.location.reload()} />
    );

  if (!detail) return null;

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
          <ProductDetailList detail={detail} />
          <div className="mt-6 space-y-4">
            <OptionSelector
              label="Color"
              options={detail.options?.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
            <OptionSelector
              label="Almacenamiento"
              options={detail.options?.storages}
              selected={selectedStorage}
              onSelect={setSelectedStorage}
            />
            <button
              disabled={addIsLoading}
              className={`px-6 py-2 rounded text-white transition ${
                addIsLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleAddToCart}
            >
              {addIsLoading ? "Añadiendo..." : "Añadir"}
            </button>
            {addError && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {addError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
