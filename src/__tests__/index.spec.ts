import {
  allOf,
  anyOf,
  arraySameElements,
  ensureArray,
  ensureArrayOf,
  findAndRemove,
  isArrayOf,
  isSubset,
  noneOf,
  uniqAndSort,
  uniqAndSortBy,
  validKeysOf,
} from "..";

describe("uniqAndSort", () => {
  it("empty array", () => {
    expect(uniqAndSort([])).toEqual([]);
  });
  it("uniq and sort", () => {
    expect(uniqAndSort([1, 4, 10, 3, 4, 1])).toEqual([1, 3, 4, 10]);
  });
});

describe("uniqAndSortBy", () => {
  describe("with iterator function", () => {
    const fn = (x: number) => {
      if (x === 0) return "0-zero";
      if (x % 2 === 0) return `1-even--${x}`;
      return `2-odd--${x}`;
    };
    it("empty array", () => {
      expect(uniqAndSortBy([], fn)).toEqual([]);
    });
    it("uniq and sort", () => {
      expect(uniqAndSortBy([1, 4, 10, 3, 0, 4, 1], fn)).toEqual([0, 10, 4, 1, 3]);
    });
  });

  describe("without iterator function", () => {
    it("empty array", () => {
      expect(uniqAndSortBy([])).toEqual([]);
    });
    it("uniq and sort", () => {
      expect(uniqAndSortBy([1, 4, 10, 3, 4, 1])).toEqual([1, 3, 4, 10]);
    });
  });
});

describe("anyOf", () => {
  const fn = (x: number) => x > 2;
  it("false with blank array", () => {
    expect(anyOf([], fn)).toBeFalsy();
  });
  it("false if no element is true", () => {
    expect(anyOf([1, 2], fn)).toBeFalsy();
  });
  it("true if some element is true, but not all", () => {
    expect(anyOf([1, 2, 3], fn)).toBeTruthy();
  });
  it("true if all elements are true", () => {
    expect(anyOf([3, 4], fn)).toBeTruthy();
  });
});

describe("allOf", () => {
  const fn = (x: number) => x > 2;
  it("true with blank array", () => {
    expect(allOf([], fn)).toBeTruthy();
  });
  it("false if no element is true", () => {
    expect(allOf([1, 2], fn)).toBeFalsy();
  });
  it("false if some element is true, but not all", () => {
    expect(allOf([1, 2, 3], fn)).toBeFalsy();
  });
  it("true if all elements are true", () => {
    expect(allOf([3, 4], fn)).toBeTruthy();
  });
});

describe("noneOf", () => {
  const fn = (x: number) => x > 2;
  it("true with blank array", () => {
    expect(noneOf([], fn)).toBeTruthy();
  });
  it("true if no element is true", () => {
    expect(noneOf([1, 2], fn)).toBeTruthy();
  });
  it("false if some element is true, but not all", () => {
    expect(noneOf([1, 2, 3], fn)).toBeFalsy();
  });
  it("false if all elements are true", () => {
    expect(noneOf([3, 4], fn)).toBeFalsy();
  });
});

describe("isSubset", () => {
  it("true with a subset", () => {
    expect(isSubset({ set: [1, 2, 3], subset: [3, 1] })).toBe(true);
  });
  it("true with the same set", () => {
    expect(isSubset({ set: [1, 2, 3], subset: [3, 1, 2] })).toBe(true);
  });
  it("false with extra stuff", () => {
    expect(isSubset({ set: [1, 2, 3], subset: [3, 2, 4] })).toBe(false);
  });
});

describe("arraySameElements", () => {
  it("true with the same set", () => {
    expect(arraySameElements([1, 2, 3], [1, 2, 3])).toBe(true);
  });
  it("true with the same set, different order", () => {
    expect(arraySameElements([1, 2, 3], [3, 1, 2])).toBe(true);
  });
  it("true with the same set, empty arrays", () => {
    expect(arraySameElements([], [])).toBe(true);
  });

  it("false with a subset", () => {
    expect(arraySameElements([1, 2, 3], [3, 1])).toBe(false);
  });
  it("false with extra stuff", () => {
    expect(arraySameElements([1, 2, 3], [3, 2, 4])).toBe(false);
  });
});

describe("isArrayOf", () => {
  const fn = (x: any): x is number => typeof x === "number";
  it("false if no array", () => {
    expect(isArrayOf(null, fn)).toBeFalsy();
    expect(isArrayOf("3", fn)).toBeFalsy();
    expect(isArrayOf("[1, 2]", fn)).toBeFalsy();
    expect(isArrayOf(3, fn)).toBeFalsy();
  });
  it("true with empty array", () => {
    expect(isArrayOf([], fn)).toBeTruthy();
  });
  it("false if array but not every element satisfies condition", () => {
    expect(isArrayOf([1, "2"], fn)).toBeFalsy();
  });
  it("true if array and every element satisfies condition", () => {
    expect(isArrayOf([1, 2], fn)).toBeTruthy();
  });
});

describe("ensureArray", () => {
  it("array given => return it", () => {
    const a = [1, 2];
    expect(ensureArray(a)).toBe(a);
  });
  it("not array given => return array with the given object inside", () => {
    const a = 1;
    expect(ensureArray(a)).toEqual([1]);
  });
});

describe("ensureArrayOf", () => {
  const fn = (x: any): x is number => typeof x === "number";

  it("with empty array => same", () => {
    const a: unknown[] = [];
    expect(ensureArrayOf(a, fn)).toBe(a);
  });
  it("with single element (valid) given => array with element", () => {
    const a = 1;
    expect(ensureArrayOf(a, fn)).toEqual([a]);
  });
  it("with single element (invalid) given => null", () => {
    expect(ensureArrayOf("1", fn)).toBeNull();
  });
  it("if array but not every element satisfies condition => null", () => {
    expect(ensureArrayOf([1, "2"], fn)).toBeNull();
  });
  it("if array and every element satisfies condition => same", () => {
    const a = [1, 2];
    expect(ensureArrayOf(a, fn)).toBe(a);
  });
});

describe("findAndRemove", () => {
  const fn = (x: number) => x > 2;
  it("with a single found element => returns first found and rest", () => {
    const list = [1, 3, 2, 0];
    const expected = [3, [1, 2, 0]];
    const actual = findAndRemove(list, fn);
    expect(actual).toEqual(expected);
  });
  it("with a many found elements => returns first found and rest", () => {
    const list = [1, 3, 2, 0, 4, 0];
    const expected = [3, [1, 2, 0, 4, 0]];
    const actual = findAndRemove(list, fn);
    expect(actual).toEqual(expected);
  });
  it("with a no found elements => returns blank found, same list", () => {
    const list = [1, 2, 0, 0];
    const expected = [undefined, [1, 2, 0, 0]];
    const actual = findAndRemove(list, fn);
    expect(actual).toEqual(expected);
  });
});

describe("validKeysOf", () => {
  type ValidKeys = "a" | "b";
  const validFn = (key: string): key is ValidKeys => key === "a" || key === "b";

  it("empty array with no keys", () => {
    expect(validKeysOf({}, validFn)).toEqual([]);
  });
  it("empty array with keys, but no valid keys (TS will complain)", () => {
    expect(validKeysOf({ z: 1 } as Partial<Record<ValidKeys, unknown>>, validFn)).toEqual([]);
  });
  it("present keys", () => {
    expect(validKeysOf({ a: "whatever", b: 3 }, validFn)).toEqual(["a", "b"]);
  });
  it("present keys, ignoring extra (TS will complain)", () => {
    expect(validKeysOf({ a: "whatever", extra: 13 } as Partial<Record<ValidKeys, unknown>>, validFn)).toEqual(["a"]);
  });
});
