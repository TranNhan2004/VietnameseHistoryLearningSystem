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

export function toHistoricalYear(year: number): string {
  return year < 0 ? `${-year} TCN` : year.toString();
}

export function formatPointAllocationRule(pointAllocationRule: string): string {
  const rules = pointAllocationRule.split('-');
  let res = `Đúng ${rules[0].split(':')[0]} ý - hưởng ${
    rules[0].split(':')[1]
  }%`;
  for (let i = 1; i < rules.length; i++) {
    const sub = rules[i].split(':');
    res += `, đúng ${sub[0]} ý - hưởng ${sub[1]}%`;
  }

  return `(${res})`;
}

export class DateUtils {
  static now(): Date {
    return new Date();
  }

  static toDate(input: string | Date): Date {
    if (input instanceof Date) {
      return new Date(input.getTime());
    }
    return new Date(input);
  }

  static toLocalTimeStr(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes())
    );
  }
}
