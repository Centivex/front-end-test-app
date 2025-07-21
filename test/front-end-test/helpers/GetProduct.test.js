import getProduct from '../../../src/front-end-test/helpers/GetProduct.jsx';
import * as Cache from "../../../src/storage/Cache";

describe('getProduct', () => {
  const mockProducts = [
    { id: '1', brand: 'BrandA', model: 'ModelA', price: 100, imgUrl: 'urlA' },
    { id: '2', brand: 'BrandB', model: 'ModelB', price: 200, imgUrl: 'urlB' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if available', async () => {
    jest.spyOn(Cache, 'loadListFromCache').mockReturnValue(mockProducts);
    const fetchSpy = jest.spyOn(global, 'fetch');

    const result = await getProduct();

    expect(Cache.loadListFromCache).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should fetch data and cache it if no cached data', async () => {
    jest.spyOn(Cache, 'loadListFromCache').mockReturnValue(null);
    jest.spyOn(Cache, 'saveListToCache').mockImplementation(() => {});

    const mockApiResponse = [
      { id: '1', brand: 'BrandA', model: 'ModelA', price: 100, imgUrl: 'urlA', extraField: 'ignored' },
      { id: '2', brand: 'BrandB', model: 'ModelB', price: 200, imgUrl: 'urlB', extraField: 'ignored' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    );

    const result = await getProduct();

    expect(Cache.loadListFromCache).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://itx-frontend-test.onrender.com/api/product');
    expect(Cache.saveListToCache).toHaveBeenCalledWith([
      { id: '1', brand: 'BrandA', model: 'ModelA', price: 100, imgUrl: 'urlA' },
      { id: '2', brand: 'BrandB', model: 'ModelB', price: 200, imgUrl: 'urlB' },
    ]);
    expect(result).toEqual([
      { id: '1', brand: 'BrandA', model: 'ModelA', price: 100, imgUrl: 'urlA' },
      { id: '2', brand: 'BrandB', model: 'ModelB', price: 200, imgUrl: 'urlB' },
    ]);
  });

  it('should throw an error if fetch response is not ok', async () => {
    jest.spyOn(Cache, 'loadListFromCache').mockReturnValue(null);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await expect(getProduct()).rejects.toThrow('No se ha podido obtener los productos, intentelo más tarde');
  });
});
