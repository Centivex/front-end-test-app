import { renderHook, waitFor } from '@testing-library/react';
import { useFetchProducts } from '../../../src/front-end-test/hooks/useFetchProducts';
import getProduct from '../../../src/front-end-test/helpers/GetProduct';

jest.mock('../../../src/front-end-test/helpers/GetProduct');

describe('useFetchProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading true and empty products array', () => {
    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('should fetch products successfully and update state', async () => {
    const mockProducts = [
      { id: '1', brand: 'BrandA', model: 'ModelA', price: 100, imgUrl: 'url1' },
      { id: '2', brand: 'BrandB', model: 'ModelB', price: 200, imgUrl: 'url2' },
    ];
    getProduct.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.error).toBe(null);
    });
  });

  it('should set error state on fetch failure', async () => {
    getProduct.mockRejectedValue(new Error('No se ha podido obtener los productos, intentelo más tarde'));

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.products).toEqual([]);
      expect(result.current.error.message).toBe(
        'No se ha podido obtener los productos, intentelo más tarde'
      );
    });
  });
});
