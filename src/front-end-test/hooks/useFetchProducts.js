import { useEffect, useState } from "react";
import getProduct from "../helpers/GetProduct";

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [addIsLoading, setAddIsLoading] = useState(true);

  const getProductsList = async () => {
    const newProducts = await getProduct();
    setProducts(newProducts);
    setAddIsLoading(false);
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return {
    products,
    addIsLoading,
  };
};
