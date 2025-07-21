const EXPIRATION_TIME = 60 * 60 * 1000; 

const saveToCache = (key, data) => {
  const payload = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(payload));
};

const loadFromCache = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const { timestamp, data } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > EXPIRATION_TIME) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    localStorage.removeItem(key); 
    return null;
  }
};

const PRODUCTS_CACHE_KEY = "products_cache";
const CART_COUNT_KEY = "cart_count";

export const saveListToCache = (data) => saveToCache(PRODUCTS_CACHE_KEY, data);
export const loadListFromCache = () => loadFromCache(PRODUCTS_CACHE_KEY);

export const saveDetailToCache = (id, data) =>
  saveToCache(`product_detail_${id}`, data);
export const loadDetailFromCache = (id) =>
  loadFromCache(`product_detail_${id}`);

export const saveCartCountToCache = (count) =>
  saveToCache(CART_COUNT_KEY, count);
export const loadCartCountFromCache = () =>
  loadFromCache(CART_COUNT_KEY);
