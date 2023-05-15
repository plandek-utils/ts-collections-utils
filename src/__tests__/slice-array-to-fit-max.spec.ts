import { sliceArrayToFitMax } from "..";

afterAll(() => {
  global.gc && global.gc();
});

describe("sliceArrayToFitMax", () => {
  const oneToFive = ["one", "two", "three", "four", "five"];
  it("creates scaled slices", () => {
    expect(sliceArrayToFitMax(oneToFive, 1)).toEqual([{ low: 1, high: 1, value: "five" }]);
    expect(sliceArrayToFitMax(oneToFive, 2)).toEqual([
      { low: 1, high: 1, value: "four" },
      { low: 2, high: 2, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 3)).toEqual([
      { low: 1, high: 1, value: "three" },
      { low: 2, high: 2, value: "four" },
      { low: 3, high: 3, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 4)).toEqual([
      { low: 1, high: 1, value: "two" },
      { low: 2, high: 2, value: "three" },
      { low: 3, high: 3, value: "four" },
      { low: 4, high: 4, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 5)).toEqual([
      { low: 1, high: 1, value: "one" },
      { low: 2, high: 2, value: "two" },
      { low: 3, high: 3, value: "three" },
      { low: 4, high: 4, value: "four" },
      { low: 5, high: 5, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 6)).toEqual([
      { low: 1, high: 2, value: "three" },
      { low: 3, high: 4, value: "four" },
      { low: 5, high: 6, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 7)).toEqual([
      { low: 1, high: 2, value: "two" },
      { low: 3, high: 4, value: "three" },
      { low: 5, high: 6, value: "four" },
      { low: 7, high: 8, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 11)).toEqual([
      { low: 1, high: 3, value: "two" },
      { low: 4, high: 6, value: "three" },
      { low: 7, high: 9, value: "four" },
      { low: 10, high: 12, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 14)).toEqual([
      { low: 1, high: 3, value: "one" },
      { low: 4, high: 6, value: "two" },
      { low: 7, high: 9, value: "three" },
      { low: 10, high: 12, value: "four" },
      { low: 13, high: 15, value: "five" },
    ]);
    expect(sliceArrayToFitMax(oneToFive, 66)).toEqual([
      { low: 1, high: 14, value: "one" },
      { low: 15, high: 28, value: "two" },
      { low: 29, high: 42, value: "three" },
      { low: 43, high: 56, value: "four" },
      { low: 57, high: 70, value: "five" },
    ]);
  });
  it("throws an error if it can't find a suitable scale", () => {
    expect(() => sliceArrayToFitMax([], 1)).toThrowError("Couldn't find a suitable scale");
  });
});
