import { format, isToday, parseISO, subDays, differenceInDays } from "date-fns";

/** Return YYYY-MM-DD for a date (timezone-safe for storage). */
export function toDateString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function todayString(): string {
  return toDateString(new Date());
}

export function parseDateString(s: string): Date {
  return parseISO(s);
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateString(a) === toDateString(b);
}

export function getConsecutiveDatesBackwards(fromDate: Date, maxDays: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < maxDays; i++) {
    const d = subDays(fromDate, i);
    out.push(toDateString(d));
  }
  return out;
}

export function daysBetween(start: string, end: string): number {
  return differenceInDays(parseDateString(end), parseDateString(start)) + 1;
}

export { isToday, format, subDays };
