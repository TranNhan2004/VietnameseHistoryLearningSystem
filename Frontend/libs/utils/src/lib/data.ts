export function isNAValue(value: unknown) {
  return value === undefined || value === null || value === '';
}

export function isDate(value: any): boolean {
  return value instanceof Date;
}

export function isIsoDateString(value: any): boolean {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value);
}

export function toHistoricalYear(year: number): string {
  return year < 0 ? `${-year} TCN` : year.toString();
}
