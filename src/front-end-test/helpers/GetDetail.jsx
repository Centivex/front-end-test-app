import { loadDetailFromCache, saveDetailToCache } from "../../storage/Cache";

const getDetail = async (id) => {
  const cachedData = loadDetailFromCache(id);
  if (cachedData) {
    return cachedData;
  }

  const url = `https://itx-frontend-test.onrender.com/api/product/${id}`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Failed to fetch detail");
  }

  const data = await resp.json();

  const detail = {
    imgUrl: data.imgUrl,
    brand: data.brand,
    model: data.model,
    price: data.price,
    cpu: data.cpu,
    ram: data.ram,
    os: data.os,
    displayResolution: data.displayResolution,
    battery: data.battery,
    primaryCamera: data.primaryCamera,
    secondaryCmera: data.secondaryCmera,
    dimentions: data.dimentions,
    weight: data.weight,
    options: data.options
  };

  saveDetailToCache(id, detail);

  return detail;
};

export default getDetail;
