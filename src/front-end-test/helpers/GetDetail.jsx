import { loadDetailFromCache, saveDetailToCache } from "../../storage/Cache";

const getDetail = async (id) => {
  const cachedData = loadDetailFromCache(id);
  if (cachedData) {
    console.log("te lo devuelvo guardado");
    return cachedData;
  }

  const url = `https://itx-frontend-test.onrender.com/api/product/${id}`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Failed to fetch detail");
  }

  const data = await resp.json();

  console.log("la data es:", data);

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
    secondaryCamera: data.secondaryCamera,
    dimentions: data.dimentions,
    weight: data.weight,
    options: data.options
  };

  console.log("la data2 es:", detail);
  saveDetailToCache(id, detail);

  return detail;
};

export default getDetail;
