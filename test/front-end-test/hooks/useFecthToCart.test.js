import { renderHook, act } from '@testing-library/react';
import postToCart from '../../../src/front-end-test/helpers/PostToCart';
import { useFetchToCart } from '../../../src/front-end-test/hooks/useFecthToCart';

jest.mock('../../../src/front-end-test/helpers/PostToCart');

describe('useFetchToCart hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with isLoading false and error null', () => {
    const { result } = renderHook(() => useFetchToCart());

    expect(result.current.addIsLoading).toBe(false);
    expect(result.current.addError).toBe(null);
  });

  it('should set loading, call postToCart, and return count on success', async () => {
    const fakeCount = 5;
    postToCart.mockResolvedValue({ count: fakeCount });

    const { result } = renderHook(() => useFetchToCart());

    let returnedCount;
    await act(async () => {
      returnedCount = await result.current.addToCart('id', 'color', 'storage');
    });

    expect(postToCart).toHaveBeenCalledWith('id', 'color', 'storage');
    expect(returnedCount).toBe(fakeCount);
    expect(result.current.addIsLoading).toBe(false);
    expect(result.current.addError).toBe(null);
  });

  it('should set error and loading false on failure', async () => {
    postToCart.mockRejectedValue(new Error('Error al añadir al carrito, vuelve a intentarlo'));

    const { result } = renderHook(() => useFetchToCart());

    await act(async () => {
      const returned = await result.current.addToCart('id', 'color', 'storage');
      expect(returned).toBeUndefined();
    });

    expect(postToCart).toHaveBeenCalled();
    expect(result.current.addIsLoading).toBe(false);
    expect(result.current.addError.message).toBe('Error al añadir al carrito, vuelve a intentarlo');
  });
});
