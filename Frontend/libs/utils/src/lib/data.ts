export function isNAValue(value: unknown) {
  return value === undefined || value === null || value === '';
}

export function isDate(value: any): boolean {
  return value instanceof Date;
}

export function isIsoDateString(value: any): boolean {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value);
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

export function formatDateTime(date: Date): string {
  return date.toISOString();
}

export function formatForFlatpickr(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const dateate = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}

export function toHistoricalYear(year: number): string {
  return year < 0 ? `${-year} TCN` : year.toString();
}
