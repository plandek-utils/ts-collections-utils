import compact from "lodash.compact";
import flatMap from "lodash.flatmap";
import max from "lodash.max";
import takeRight from "lodash.takeright";
import times from "lodash.times";

export type ArraySlice<T> = {
  low: number;
  high: number;
  value: T;
};

export function sliceArrayToFitMax<T>(scaleValues: T[], maximumValue: number): ArraySlice<T>[] {
  const indices = times(scaleValues.length);
  const possibleMaxCeilings = indices.map((i) => maximumValue + i);
  const possibleChunkCounts = compact(
    flatMap(possibleMaxCeilings, (ceil) => {
      return flatMap(indices, (i) => {
        const div = i + 1;
        const mod = ceil % div;
        const size = ceil / div;
        const count = Math.ceil(maximumValue / size);
        if (mod > 0) return null;

        if (count > scaleValues.length) return null;
        const upperBound = count * size;
        const lowerBound = (count - 1) * size;

        if (maximumValue > lowerBound && maximumValue <= upperBound) {
          return count;
        }
        return null;
      });
    })
  );

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
