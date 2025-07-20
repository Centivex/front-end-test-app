const postToCart = async (id, colorCode, storageCode) => {
  const url = "https://itx-frontend-test.onrender.com/api/cart";

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

  const data = await resp.json();

  return data;
};

export default postToCart;
