export function isNAValue(value: unknown) {
  return value === undefined || value === null || value === '';
}
