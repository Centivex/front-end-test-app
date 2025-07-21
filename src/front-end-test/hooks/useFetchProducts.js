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
      setError("No se ha podido obtener los productos, intentelo más tarde");
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
