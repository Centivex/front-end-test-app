import { loadListFromCache, saveListToCache } from "../../storage/Cache";

const getProduct = async () => {
  const cachedData = loadListFromCache();
  if (cachedData) {
    return cachedData;
  }

  const url = `https://itx-frontend-test.onrender.com/api/product`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await resp.json();

  const products = data.map((item) => ({
    id: item.id,
    brand: item.brand,
    model: item.model,
    price: item.price,
    imgUrl: item.imgUrl,
  }));

  saveListToCache(products);

  return products;
};

export default getProduct;
