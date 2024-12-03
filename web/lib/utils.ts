import { clsx, type ClassValue } from "clsx";
import { isWithinInterval, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUniqueDates(availableTimes: any[]) {
  const uniqueDates = new Map<string, any>();
  return availableTimes.filter((date) => {
    if (!uniqueDates.has(date.date.toDateString())) {
      uniqueDates.set(date.date.toDateString(), true);
      return true;
    }
    return false;
  });
}

export function separateFirstName(name: string | undefined) {
  if (!name) return name;
  const names = name.split(" ");
  if (names.length === 0) return name;
  return names[0];
}

export const calculatePositionAndHeight = (start: string, end: string) => {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const top = (startMinutes - timeToMinutes("08:00")) * 1.4;
  const height = (endMinutes - startMinutes) * 1.25;
  return { top, height };
};

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const calculateDuration = (start: string, end: string) => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  return endInMinutes - startInMinutes;
};

export const isClassCurrent = (
  classDate: string,
  start: string,
  end: string
) => {
  const currentDate = new Date();
  const classStartDate = parseISO(`${classDate}T${start}:00`);
  const classEndDate = parseISO(`${classDate}T${end}:00`);

  return isWithinInterval(currentDate, {
    start: classStartDate,
    end: classEndDate,
  });
};

export const separateNameNum = (name: string) => {
  const split = name.match(/([a-zA-Z]+)([0-9]+)/);
  return split ? `${split[1]} ${split[2]}` : name;
};

export const pluralize = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural;

export const listWithAnd = (list: string[]) => {
  if (list.length === 0) {
    return "";
  }
  if (list.length === 1) {
    console.log("list[0]: ", list[0]);
    return list[0];
  }
  if (list.length === 2) {
    return `${list[0]} and ${list[1]}`;
  }
  return `${list.slice(0, -1).join(", ")}, and ${list.at(-1)}`;
};

export const run = <TResult>(fn: () => TResult): TResult => fn();
