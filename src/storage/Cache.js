const CACHE_KEY = "products_cache";
const EXPIRATION_TIME = 60 * 60 * 1000;

export const saveToCache = (data) => {
  const payload = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
};

export const loadFromCache = () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached);
  const now = Date.now();

  if (now - timestamp > EXPIRATION_TIME) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return data;
};
