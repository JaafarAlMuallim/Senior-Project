import { clsx, type ClassValue } from "clsx";
import { isWithinInterval, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  end: string,
) => {
  const currentDate = new Date();
  const classStartDate = parseISO(`${classDate}T${start}:00`);
  const classEndDate = parseISO(`${classDate}T${end}:00`);

  return isWithinInterval(currentDate, {
    start: classStartDate,
    end: classEndDate,
  });
};
