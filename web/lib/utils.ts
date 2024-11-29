import { clsx, type ClassValue } from "clsx";
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
export const separateNameNum = (name: string) => {
  const split = name.match(/([a-zA-Z]+)([0-9]+)/);
  return split ? `${split[1]} ${split[2]}` : name;
};
