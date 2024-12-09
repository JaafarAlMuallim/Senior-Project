"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenderSelector } from "./GenderSelector";
import { MultiSelector } from "./MultiSelector";
import { SingleSelector } from "./SingleSelector";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { DAYS } from "@/validators/Placeholders";
import CourseOnly from "@/models/courseOnly";
import { useCallback, useMemo } from "react";

const ScheduleClient = ({
  courses,
  instructors,
}: {
  courses: Map<string, CourseOnly>;
  instructors: Map<string, string>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseAsLabelValue = useMemo(() => {
    return courses
      ? Array.from(courses.values()).map((course) => ({
          value: course.id,
          label: course.name,
        }))
      : [];
  }, []);
  const instructorsAsLabelValue = useMemo(() => {
    return instructors
      ? Array.from(instructors.values()).map((instructor) => ({
          value: instructor,
          label: instructor,
        }))
      : [];
  }, []);

  const updateSearchParams = useCallback(
    (key: string, value: string | string[]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (Array.isArray(value)) {
        if (value.length > 0) {
          newParams.set(key, value.join(","));
        } else {
          newParams.delete(key);
        }
      } else {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      }
      console.log(newParams.toString());
      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [searchParams],
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between gap-2 w-full text-sm font-normal">
        <GenderSelector
          gender={(searchParams.get("gender") as string) || "male"}
          setGender={(value) => updateSearchParams("gender", value)}
        />
        <Toggle
          pressed={searchParams.get("addableOnly") === "true"}
          onPressedChange={(value) =>
            updateSearchParams("addableOnly", value.toString())
          }
          className={cn(
            "bg-white border border-muted shadow whitespace-nowrap",
            searchParams.get("addableOnly") === "true"
              ? "bg-primary-light border-primary-foreground"
              : "",
          )}
        >
          Addable Only
        </Toggle>
        <MultiSelector
          title="Select Days"
          items={DAYS.options}
          selected={searchParams.get("days")?.split(",") || []}
          setSelected={(value) => updateSearchParams("days", value)}
          searchPlaceholder="Search days..."
          className="w-[193px]"
        />
        <SingleSelector
          items={courseAsLabelValue}
          value={searchParams.get("course") || ""}
          setValue={(value) => updateSearchParams("course", value)}
          placeholder="Select Course"
          searchPlaceholder="Search course..."
          field="course"
          className="w-[380px]"
        />
        <MultiSelector
          title="Select Instructors"
          items={instructorsAsLabelValue}
          selected={searchParams.get("instructors")?.split(",") || []}
          setSelected={(value) => updateSearchParams("instructors", value)}
          searchPlaceholder="Search instructors..."
          className="w-[380px]"
        />
      </div>
    </div>
  );
};
export default ScheduleClient;
