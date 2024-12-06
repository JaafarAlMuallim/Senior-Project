import { cn } from "@/lib/utils";
import { sub } from "date-fns";
import React from "react";

const COURSES = [
  {
    course: "CSE 110",
    title: "Software Engineering",
    days: ["MON", "WED"],
    time: "10:00 - 10:50",
  },
  {
    course: "CSE 120",
    title: "Computer Architecture",
    days: ["TUE", "THU"],
    time: "14:00 - 15:30",
  },
  {
    course: "MATH 180",
    title: "Linear Algebra",
    days: ["MON", "WED", "FRI"],
    time: "13:00 - 13:50",
  },
];

const MAPPER = {
  U: "SUN",
  M: "MON",
  T: "TUE",
  W: "WED",
  R: "THU",
  F: "FRI",
  S: "SAT",
};

const ScheduleVisualization = ({ schedule }: { schedule: Schedule[] }) => {
  const hours = Array.from(
    { length: 14 },
    (_, i) => `${(i + 7).toString().padStart(2, "0")}:00`,
  );
  const days = ["U", "M", "T", "W", "R"];

  const getTimeSlot = (time: string) => {
    const [start, end] = time.split(" - ");
    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);
    const startMinute = parseInt(start.split(":")[1]);
    const endMinute = parseInt(end.split(":")[1]);
    return {
      start: startHour - 7 + startMinute / 60,
      duration: endHour - startHour + (endMinute - startMinute) / 60,
    };
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full overflow-x-auto dark:bg-gray-800 flex items-center justify-center">
      <div className="grid grid-cols-6 gap-1 w-full">
        <div className="sticky left-0 bg-gray-100 dark:bg-gray-800 z-10 w-2"></div>
        {days.map((day, idx) => (
          <div
            key={idx}
            className="py-2 text-center font-semibold text-gray-800 rounded-t-md dark:text-gray-200"
          >
            {MAPPER[day as keyof typeof MAPPER]}
          </div>
        ))}

        {hours.map((hour, hourIdx) => (
          <React.Fragment key={hourIdx}>
            <div className="sticky bg-gray-100 dark:bg-gray-800 z-10 text-center pr-2 text-sm text-gray-600 dark:text-gray-400">
              {hour}
            </div>
            {days.map((day, dayIdx) => (
              <div
                key={`${hourIdx}-${dayIdx}`}
                className="border-b border-r border-l border-gray-300 dark:border-gray-600 h-12 relative rounded-lg"
              >
                {schedule.map((scheduleItem, courseIdx) => {
                  const section = scheduleItem.section;
                  const startTime = section.startTime
                    .toISOString()
                    .split("T")[1]
                    .slice(0, -5);
                  const endTime = section.endTime
                    .toISOString()
                    .split("T")[1]
                    .slice(0, -5);
                  if (section.recurrence!.includes(day)) {
                    const { start, duration } = getTimeSlot(
                      `${startTime} - ${endTime}`,
                    );
                    if (Math.floor(start) === hourIdx) {
                      return (
                        <div
                          key={courseIdx}
                          className={cn(
                            "absolute w-full text-white-default text-xs overflow-hidden bg-primary-light rounded-lg px-2 flex flex-col justify-around z-20",
                          )}
                          style={{
                            top: `${(start % 1) * 100}%`,
                            height: `${duration * 100}%`,
                          }}
                        >
                          <div className="font-semibold uppercase">
                            {section.course.code}
                          </div>
                          <div className="text-xs capitalize">
                            {section.course.name}
                          </div>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleVisualization;
