import { isNAValue } from './data.utility';

export function search<T extends object>(
  arr: T[],
  keys: (keyof T)[],
  searchValue: string
): T[] {
  const searchStr = searchValue.toLowerCase();
  return arr.filter((item) =>
    keys.some((key) => String(item[key]).toLowerCase().includes(searchStr))
  );
}

export function sort<T extends object>(
  arr: T[],
  keys: (keyof T)[],
  isAscending = true
): T[] {
  return [...arr].sort((a, b) => {
    for (const key of keys) {
      let valueA: string | T[keyof T] = a[key];
      let valueB: string | T[keyof T] = b[key];

      if (isNAValue(valueA)) valueA = '';
      if (isNAValue(valueB)) valueB = '';

      if (valueA < valueB) return isAscending ? -1 : 1;
      if (valueA > valueB) return isAscending ? 1 : -1;
    }
    return 0;
  });
}
