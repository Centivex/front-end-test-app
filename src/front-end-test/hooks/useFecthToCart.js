import { useState } from "react";
import postToCart from "../helpers/PostToCart";

export const useFetchToCart = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async (id, colorCode, storageCode) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await postToCart(id, colorCode, storageCode);
      setCount(result.count);
    } catch (err) {
      setError(err.message || "Error al añadir al carrito");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    count,
    isLoading,
    error,
    addToCart,
  };
};
