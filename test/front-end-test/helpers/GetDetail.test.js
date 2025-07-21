import getDetail from "../../../src/front-end-test/helpers/GetDetail";
import * as Cache from "../../../src/storage/Cache";

describe("getDetail", () => {
  const mockId = "123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached data if available", async () => {
    const cachedData = { brand: "TestBrand", model: "TestModel" };
    jest.spyOn(Cache, "loadDetailFromCache").mockReturnValue(cachedData);
    const data = await getDetail(mockId);
    expect(Cache.loadDetailFromCache).toHaveBeenCalledWith(mockId);
    expect(data).toEqual(cachedData);
  });

  it("should fetch data and save to cache if no cached data", async () => {
    jest.spyOn(Cache, "loadDetailFromCache").mockReturnValue(null);

    const mockResponseData = {
      imgUrl: "img.jpg",
      brand: "BrandX",
      model: "ModelY",
      price: 100,
      cpu: "CPU",
      ram: "8GB",
      os: "OS",
      displayResolution: "1080p",
      battery: "3000mAh",
      primaryCamera: "12MP",
      secondaryCmera: "8MP",
      dimentions: "150x70x8",
      weight: "150g",
      options: []
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      })
    );

    const saveSpy = jest.spyOn(Cache, "saveDetailToCache");

    const data = await getDetail(mockId);

    expect(global.fetch).toHaveBeenCalledWith(`https://itx-frontend-test.onrender.com/api/product/${mockId}`);
    expect(saveSpy).toHaveBeenCalledWith(mockId, expect.objectContaining({ brand: "BrandX", model: "ModelY" }));
    expect(data).toEqual(expect.objectContaining({ brand: "BrandX", model: "ModelY" }));
  });

  it("should throw an error if fetch fails", async () => {
    jest.spyOn(Cache, "loadDetailFromCache").mockReturnValue(null);
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

    await expect(getDetail(mockId)).rejects.toThrow("No se ha podido obtener los detalles del producto, intentelo más tarde");
  });
});
