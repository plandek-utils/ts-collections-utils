import { compact, flatMap, max, takeRight, times } from "es-toolkit/compat";

export type ArraySlice<T> = {
  low: number;
  high: number;
  value: T;
};

export function sliceArrayToFitMax<T>(scaleValues: T[], maximumValue: number): ArraySlice<T>[] {
  const indices = times(scaleValues.length);
  const possibleMaxCeilings = indices.map((i) => maximumValue + i);
  const possibleChunkCounts: number[] = [];
  for (const ceil of possibleMaxCeilings) {
    for (const i of indices) {
      const div = i + 1;
      const mod = ceil % div;
      const size = ceil / div;
      const count = Math.ceil(maximumValue / size);
      if (mod > 0 || count > scaleValues.length) {
        continue;
      }

      const upperBound = count * size;
      const lowerBound = (count - 1) * size;

      if (maximumValue > lowerBound && maximumValue <= upperBound) {
        possibleChunkCounts.push(count);
      }
    }
  }

  const chunkCount = max(possibleChunkCounts);
  if (!chunkCount) {
    throw new Error("Couldn't find a suitable scale");
  }

  const chunkSize = Math.ceil(maximumValue / chunkCount);
  const scale = takeRight(scaleValues, chunkCount);
  return scale.map((v, i) => {
    const low = i * chunkSize + 1;
    const high = (i + 1) * chunkSize;
    return {
      low,
      high,
      value: v,
    };
  });
}
