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

export function formatDateTimeInput(date: Date): string {
  return date.toISOString().substring(0, date.toISOString().length - 8);
}

export function toHistoricalYear(year: number): string {
  return year < 0 ? `${-year} TCN` : year.toString();
}

export function formatPointAllocationRule(pointAllocationRule: string): string {
  const rules = pointAllocationRule.split('-');
  let res = `Đúng ${rules[0].split(':')[0]} ý, hưởng ${
    rules[0].split(':')[1]
  }%`;
  for (let i = 1; i < rules.length; i++) {
    const sub = rules[i].split(':');
    res += `, đúng ${sub[0]} ý, hưởng ${sub[1]}%`;
  }

  return `(${res})`;
}


// export function formatDateTimeStr(dateStr: string): string {
//   const date = new Date(dateStr);
//   const offset = date.getTimezoneOffset();
//   const localDate = new Date(date.getTime() - offset * 60000); // chuyển về local
//
//   return localDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
// }
//
// export function formatForFlatpickr(date: Date): string {
//   const pad = (n: number) => n.toString().padStart(2, '0');
//
//   const year = date.getFullYear();
//   const month = pad(date.getMonth() + 1);
//   const dateate = pad(date.getDate());
//   const hours = pad(date.getHours());
//   const minutes = pad(date.getMinutes());
//
//   return `${year}-${month}-${date} ${hours}:${minutes}`;
// }
