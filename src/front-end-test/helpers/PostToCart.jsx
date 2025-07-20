
const postToCart  = async (id, colorCode, storageCode) => {
  /*const cachedData = loadDetailFromCache(id);
  if (cachedData) {
    console.log("te lo devuelvo guardado");
    return cachedData;
  }*/

  const url = 'https://itx-frontend-test.onrender.com/api/cart';

  const body = {
    id,
    colorCode,
    storageCode,
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw new Error("Failed to add product to cart");
  }

     console.log("Respuesta del carrito1:", resp); // { count: 1 }


  const data = await resp.json();

   console.log("Respuesta del carrito2:", data); // { count: 1 }

  return data;
};

export default postToCart;
