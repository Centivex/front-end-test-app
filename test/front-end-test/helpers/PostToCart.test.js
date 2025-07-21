import postToCart from "../../../src/front-end-test/helpers/PostToCart";

describe('postToCart', () => {
  const mockId = '123';
  const mockColorCode = 'red';
  const mockStorageCode = '64gb';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should post to the cart API and return data on success', async () => {
    const mockResponseData = { success: true, message: 'Added to cart' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      })
    );

    const result = await postToCart(mockId, mockColorCode, mockStorageCode);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://itx-frontend-test.onrender.com/api/cart',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: mockId,
          colorCode: mockColorCode,
          storageCode: mockStorageCode,
        }),
      }
    );

    expect(result).toEqual(mockResponseData);
  });

  it('should throw an error if the response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await expect(postToCart(mockId, mockColorCode, mockStorageCode)).rejects.toThrow(
      'Error al añadir al carrito, vuelve a intentarlo'
    );
  });
});
