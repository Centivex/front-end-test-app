import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetchDetail } from '../../../src/front-end-test/hooks/useFetchDetail';
import getDetail from '../../../src/front-end-test/helpers/GetDetail';

jest.mock('../../../src/front-end-test/helpers/GetDetail');

describe('useFetchDetail', () => {
  const mockId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading true and null detail and error', () => {
    const { result } = renderHook(() => useFetchDetail(mockId));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.detail).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should fetch detail successfully and update state', async () => {
  const mockDetail = { id: mockId, brand: 'BrandX', model: 'ModelY' };
  getDetail.mockResolvedValue(mockDetail);

  let result;
  await act(async () => {
    result = renderHook(() => useFetchDetail(mockId));
  });

  await waitFor(() => {
    expect(result.result.current.isLoading).toBe(false);
    expect(result.result.current.detail).toEqual(mockDetail);
    expect(result.result.current.error).toBe(null);
  });
});

it('should set error state on fetch failure', async () => {
  getDetail.mockRejectedValue(new Error('No se ha podido obtener los detalles del producto, intentelo más tarde'));

  let result;
  await act(async () => {
    result = renderHook(() => useFetchDetail(mockId));
  });

  await waitFor(() => {
    expect(result.result.current.isLoading).toBe(false);
    expect(result.result.current.detail).toBe(null);
    expect(result.result.current.error.message).toBe(
      "No se ha podido obtener los detalles del producto, intentelo más tarde"
    );
  });
});


});
