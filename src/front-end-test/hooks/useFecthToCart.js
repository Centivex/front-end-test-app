import { useState } from "react";
import postToCart from "../helpers/PostToCart";

export const useFetchToCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async (id, colorCode, storageCode) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await postToCart(id, colorCode, storageCode);
            setError("Error al añadir al carrito");

      return result.count;
    } catch (err) {
      setError("Error al añadir al carrito, vuelve a intentarlo");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addIsLoading: isLoading,
    addError: error,
    addToCart,
  };
};
