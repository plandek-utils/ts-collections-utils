import { difference, every, isEqual, isUndefined, negate, some, sortBy, without } from "es-toolkit/compat";
import type { Criterion } from "es-toolkit/dist/compat/array/orderBy";
export { ArraySlice, sliceArrayToFitMax } from "./slice-array-to-fit-max";
export { divideCollection } from "./divide-collection";

// Type Utils from lodash

type List<T> = ArrayLike<T>;
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}
type ListIterator<T, TResult> = (value: T, index: number, collection: List<T>) => TResult;

/**
 * Returns a new array with the unique elements of the given array, sorted.
 *
 * @param list
 */
export function uniqAndSort<T>(list: T[]): T[] {
  return sortBy(Array.from(new Set(list)));
}

/**
 * Returns a new array with the unique elements of the given array, sorted.
 *
 * @param list
 * @param [criteria=[_.identity]]
 *  The criteria to sort by, specified individually or in arrays.
 */
export function uniqAndSortBy<T>(list: T[], ...criteria: Array<Criterion<T> | Array<Criterion<T>>>): T[] {
  return sortBy(Array.from(new Set(list)), ...criteria);
}

/**
 * alias of _.some
 *
 * Checks if predicate returns truthy for any element of collection. Iteration is stopped once predicate
 * returns truthy. The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @return Returns true if any element passes the predicate check, else false.
 *
 * @see _.some
 */
export const anyOf = some;

/**
 * alias of _.every
 *
 * Checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate
 * returns falsey. The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @return Returns true if all elements pass the predicate check, else false.
 *
 * @see _.every
 */
export const allOf = every;

/**
 * inverse of anyOf
 *
 * Checks if predicate returns falsey for none of the elements of collection. Iteration is stopped once predicate
 * returns truthy. The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @return Returns true if none of the elements pass the predicate check, else false.
 *
 * @see _.every
 */
export const noneOf: typeof anyOf = negate(anyOf);

/**
 * Checks if all the elements of the subset are present in the set
 *
 * @param params.set haystack
 * @param params.subset needle
 * @returns Returns true if all the elements are present, else false.
 */
export function isSubset<T>({ set, subset }: { set: T[]; subset: T[] }): boolean {
  const diff = difference(subset, set);
  return diff.length === 0;
}

/**
 * Finds an element in a collection and returns a tuple with the found element first, and an array with all the rest of the elements second.
 *
 * @param list The collection to search in.
 * @param predicate the function to use to find the element.
 * @returns [found, rest], where found is the element found (or undefined), and the rest is an array with all the other elements in the same order.
 */
export function findAndRemove<T>(list: T[], predicate: ListIterator<T, boolean>): [T | undefined, T[]] {
  const found = list.find(predicate);
  const rest = isUndefined(found) ? list : without(list, found);

  return [found, rest];
}

/**
 *
 * @param list The collection to check
 * @param predicate The predicate to check the value of the type
 * @returns
 */
export function isArrayOf<T extends L, L = unknown>(list: unknown, predicate: (x: L) => x is T): list is T[] {
  if (!Array.isArray(list)) return false;

  if (list.length === 0) return true;
  return allOf(list, predicate);
}

/**
 * If `given` is an array, returns it. Otherwise it wraps it in an array.
 */
export function ensureArray<T>(given: T | T[]): T[] {
  if (Array.isArray(given)) return given;
  return [given];
}

/**
 * ensures given as an array (see `ensureArray`) and then it checks `isArrayOf`. It returns the array if it passes the check, or null otherwise.
 *
 * @see ensureArray
 * @see isArrayOf
 */
export function ensureArrayOf<T extends L, L = unknown>(given: unknown, predicate: (x: L) => x is T): T[] | null {
  const list = Array.isArray(given) ? given : [given];

  return isArrayOf(list, predicate) ? list : null;
}

/**
 * Return the list of keys of the given record that satisfy the `isValidKey` predicate.
 *
 * @param record
 * @param isValidKey
 * @returns Array of valid keys
 */
export function validKeysOf<TKey extends string>(
  record: Partial<Record<TKey, unknown>>,
  isValidKey: (key: string) => key is TKey,
): TKey[] {
  return Object.keys(record).filter(isValidKey);
}

/**
 * checks that `a` and `b` are both arrays with the same elements, regardless of the order. It uses Lodash's `isEqual`
 *
 * @param a
 * @param b
 * @returns
 */
export function arraySameElements<T = unknown>(a: T[], b: T[]): boolean {
  return isEqual(sortBy(a), sortBy(b));
}
