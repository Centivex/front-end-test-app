import { useEffect, useState } from "react";
import getDetail from "../helpers/GetDetail";

export const useFetchDetail = (id) => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGetDetail = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const detail = await getDetail(id);
      setDetail(detail);
    } catch (err) {
      setError("No se ha podido obtener los detalles del producto, intentelo más tarde");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    
      fetchGetDetail(id);
  
  }, []);

  return {
    detail,
    isLoading,
    error,
  };
};
