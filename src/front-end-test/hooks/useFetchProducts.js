import { useEffect, useState } from "react";
import getProduct from "../helpers/GetProduct";

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductsList = async () => {
    const newProducts = await getProduct();
    setProducts(newProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return {
    products,
    isLoading,
  };
};
