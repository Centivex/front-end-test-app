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
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGetDetail(id);
  }, [id]);

  return {
    detail,
    isLoading,
    error,
  };
};
