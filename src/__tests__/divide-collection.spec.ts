import { divideCollection } from "../divide-collection";

describe("divideCollection", () => {
  it("should divide an array based on a filter predicate", () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (item: number) => item > 3;
    const result = divideCollection(array, predicate);

    expect(result.positive).toEqual([4, 5]);
    expect(result.negative).toEqual([1, 2, 3]);
  });

  it("should divide a set based on a filter predicate", () => {
    const set = new Set([1, 2, 3, 4, 5]);
    const predicate = (item: number) => item <= 3;
    const result = divideCollection(set, predicate);

    expect(result.positive).toEqual([1, 2, 3]);
    expect(result.negative).toEqual([4, 5]);
  });

  it("should handle an empty array", () => {
    const array: number[] = [];
    const predicate = (item: number) => item > 3;
    const result = divideCollection(array, predicate);

    expect(result.positive).toEqual([]);
    expect(result.negative).toEqual([]);
  });

  it("should handle an empty set", () => {
    const set = new Set<number>();
    const predicate = (item: number) => item <= 3;
    const result = divideCollection(set, predicate);

    expect(result.positive).toEqual([]);
    expect(result.negative).toEqual([]);
  });

  it("should handle a predicate that matches all elements", () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (item: number) => item > 0;
    const result = divideCollection(array, predicate);

    expect(result.positive).toEqual([1, 2, 3, 4, 5]);
    expect(result.negative).toEqual([]);
  });

  it("should handle a predicate that matches no elements", () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (item: number) => item < 0;
    const result = divideCollection(array, predicate);

    expect(result.positive).toEqual([]);
    expect(result.negative).toEqual([1, 2, 3, 4, 5]);
  });
});
