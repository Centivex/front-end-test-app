import { useEffect, useState } from "react";
import getProduct from "../helpers/GetProduct";

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  const getProductsList = async () => {
    try {
      const newProducts = await getProduct();
      setProducts(newProducts);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return {
    products,
    isLoading,
    error, 
  };
};
