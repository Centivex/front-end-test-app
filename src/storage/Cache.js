const EXPIRATION_TIME = 60 * 60 * 1000;

const PRODUCTS_CACHE_KEY = "products_cache";

export const saveListToCache = (data) => {
  const payload = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(payload));
};

export const loadListFromCache = () => {
  const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached);
  const now = Date.now();

  if (now - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(PRODUCTS_CACHE_KEY);
    return null;
  }

  return data;
};

export const saveDetailToCache = (id, data) => {
  const payload = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(`product_detail_${id}`, JSON.stringify(payload));
};

export const loadDetailFromCache = (id) => {
  const cached = localStorage.getItem(`product_detail_${id}`);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached);
  const now = Date.now();

  if (now - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(`product_detail_${id}`);
    return null;
  }

  return data;
};
