"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenderSelector } from "./GenderSelector";
import { MultiSelector } from "./MultiSelector";
import { SingleSelector } from "./SingleSelector";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import {
  COURSES,
  DAYS,
  DEPTS,
  INSTRUCTORS,
  LOCATIONS,
  TIMES,
  TYPES,
} from "@/validators/Placeholders";

const ScheduleClient = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const updateSearchParams = (key: string, value: string | string[]) => {
    const newParams = new URLSearchParams(params.toString());
    if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((v) => newParams.append(key, v));
    } else {
      newParams.set(key, value);
    }
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between gap-2 w-full text-sm font-normal">
        <div className="flex flex-col gap-4">
          <GenderSelector
            gender={(searchParams.gender as string) || "male"}
            setGender={(value) => updateSearchParams("gender", value)}
          />
          <div className="flex items-center gap-2 w-28">
            <Toggle
              pressed={searchParams.addableOnly === "true"}
              onPressedChange={(value) =>
                updateSearchParams("addableOnly", value.toString())
              }
              className={cn(
                "bg-white border border-muted shadow whitespace-nowrap",
                searchParams.addableOnly === "true"
                  ? "bg-primary-light border-primary-foreground"
                  : "",
              )}
            >
              Addable Only
            </Toggle>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[420px]">
          <SingleSelector
            items={DEPTS}
            value={(searchParams.department as string) || ""}
            setValue={(value) => updateSearchParams("department", value)}
            placeholder="Select Department"
            searchPlaceholder="Search department..."
            className="w-[400px]"
          />
          <div className="flex gap-4">
            <MultiSelector
              title="Select Days"
              items={DAYS}
              selected={(searchParams.days as string[]) || []}
              setSelected={(value) => updateSearchParams("days", value)}
              searchPlaceholder="Search days..."
              className="w-[193px]"
            />
            <MultiSelector
              title="Select Times"
              items={TIMES}
              selected={(searchParams.times as string[]) || []}
              setSelected={(value) => updateSearchParams("times", value)}
              searchPlaceholder="Search times..."
              className="w-[193px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <SingleSelector
            items={COURSES}
            value={(searchParams.course as string) || ""}
            setValue={(value) => updateSearchParams("course", value)}
            placeholder="Select Course"
            searchPlaceholder="Search course..."
            className="w-[380px]"
          />
          <MultiSelector
            title="Select Instructors"
            items={INSTRUCTORS}
            selected={(searchParams.instructors as string[]) || []}
            setSelected={(value) => updateSearchParams("instructors", value)}
            searchPlaceholder="Search instructors..."
            className="w-[380px]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <SingleSelector
            items={TYPES}
            value={(searchParams.type as string) || ""}
            setValue={(value) => updateSearchParams("type", value)}
            placeholder="Select Type"
            searchPlaceholder="Search type..."
            className="w-[200px]"
          />
          <MultiSelector
            title="Select Locations"
            items={LOCATIONS}
            selected={(searchParams.locations as string[]) || []}
            setSelected={(value) => updateSearchParams("locations", value)}
            searchPlaceholder="Search locations..."
            className="w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};
export default ScheduleClient;
