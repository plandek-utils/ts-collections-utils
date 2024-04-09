/**
 * Divides a collection into two arrays based on a filter predicate.
 * @param collection
 * @param filterPredicate
 */
export function divideCollection<T>(
  collection: T[] | Set<T>,
  filterPredicate: (item: T) => boolean
): { positive: T[]; negative: T[] } {
  const left: T[] = [];
  const right: T[] = [];

  for (const item of collection) {
    if (filterPredicate(item)) {
      left.push(item);
    } else {
      right.push(item);
    }
  }

  return { positive: left, negative: right };
}
