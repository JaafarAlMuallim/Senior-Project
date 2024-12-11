"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const hours = Array.from(
    { length: 14 },
    (_, i) => `${(i + 7).toString().padStart(2, "0")}:00`,
  );
  const router = useRouter();
  const days = ["U", "M", "T", "W", "R"];
  const { mutate: removeRegistration } =
    trpc.schedule.removeSchedule.useMutation({
      onSuccess: () => {
        toast({
          title: "Removed Class",
          description: "The class has been removed from your schedule",
          className: "bg-success-600 text-primary-white",
        });
        utils.schedule.getSchedule.invalidate({
          semester: "241",
        });
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "An error occurred while removing the section",
          variant: "destructive",
        });
      },
    });

  const getTimeSlot = (time: string) => {
    const [start, end] = time.split(" - ");
    const startHour = parseInt(start.split(":")[0]) + 3;
    const endHour = parseInt(end.split(":")[0]) + 3;
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
                            "absolute w-full text-primary-white text-xs overflow-hidden bg-primary-light rounded-lg px-2 flex flex-col justify-around z-10",
                          )}
                          style={{
                            top: `${(start % 1) * 100}%`,
                            height: `${duration * 100}%`,
                          }}
                        >
                          <div className="flex justify-between">
                            <div className="font-semibold uppercase">
                              {section.title} | {section.location}
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <X size={16} color={"white"} />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    This action will delete the course of your
                                    courses list
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action will delete the course from your
                                    courses list. You can add it if there is no
                                    conflict with your current schedule.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      removeRegistration({
                                        sectionId: section.id,
                                        semester: "241",
                                      });
                                    }}
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                          <div className="text-xs capitalize">
                            {section.instructor}
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
