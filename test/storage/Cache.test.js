import {
  saveListToCache,
  loadListFromCache,
  saveDetailToCache,
  loadDetailFromCache,
  saveCartCountToCache,
  loadCartCountFromCache,
} from "../../src/storage/Cache";

const now = Date.now;

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers();
  jest.setSystemTime(now()); 
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Cache utils", () => {
  test("saveListToCache and loadListFromCache save and load correctly", () => {
  const data = [{ id: 1, model: "iPhone" }];
  saveListToCache(data);

  const loaded = loadListFromCache();
  expect(loaded).toEqual(data);
});

test("loadListFromCache returns null if expired", () => {
  const data = [{ id: 1, model: "Galaxy" }];
  saveListToCache(data);

  jest.advanceTimersByTime(60 * 60 * 1000 + 1);

  const result = loadListFromCache();
  expect(result).toBeNull();
});

test("saveDetailToCache and loadDetailFromCache work", () => {
  const id = "123";
  const detail = { id, model: "Pixel" };
  saveDetailToCache(id, detail);

  const loaded = loadDetailFromCache(id);
  expect(loaded).toEqual(detail);
});

test("loadDetailFromCache returns null if expired", () => {
  const id = "999";
  const detail = { id, model: "Moto" };
  saveDetailToCache(id, detail);

  jest.advanceTimersByTime(60 * 60 * 1000 + 1);
  const result = loadDetailFromCache(id);
  expect(result).toBeNull();
});

test("saveCartCountToCache and loadCartCountFromCache work", () => {
  saveCartCountToCache(7);
  const loaded = loadCartCountFromCache();
  expect(loaded).toBe(7);
});

test("loadCartCountFromCache returns null if expired", () => {
  saveCartCountToCache(3);
  jest.advanceTimersByTime(60 * 60 * 1000 + 10);
  const result = loadCartCountFromCache();
  expect(result).toBeNull();
});

test("loadListFromCache returns null if no cache exists", () => {
  const result = loadListFromCache();
  expect(result).toBeNull();
});

test("loadDetailFromCache returns null if no cache exists", () => {
  const result = loadDetailFromCache("abc");
  expect(result).toBeNull();
});

test("loadCartCountFromCache returns null if no cache exists", () => {
  const result = loadCartCountFromCache();
  expect(result).toBeNull();
});

test("loadFromCache removes corrupted data from localStorage", () => {
  localStorage.setItem("products_cache", "{invalid_json");

  const result = loadListFromCache();
  expect(result).toBeNull();
  expect(localStorage.getItem("products_cache")).toBeNull();
});

});
