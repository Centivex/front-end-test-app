import { useEffect, useState } from "react";
import getDetail from "../helpers/GetDetail";

export const useFetchDetail = (id) => {
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGetDetail = async (id) => {
    const detail = await getDetail(id);
    setDetail(detail);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGetDetail(id);
  }, []);

  return {
    detail,
    isLoading,
  };
};
