"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Toggle } from "@/components/ui/toggle";
import {
  COURSES,
  DAYS,
  DEPTS,
  INSTRUCTORS,
  LOCATIONS,
  TIMES,
  TYPES,
} from "@/validators/Placeholders";
import { useState } from "react";
import { GenderSelector } from "./GenderSelector";
import { MultiSelector } from "./MultiSelector";
import { ScheduleTable } from "./ScheduleTable";
import { SingleSelector } from "./SingleSelector";
import { cn } from "@/lib/utils";

const Schedule = () => {
  const [gender, setGender] = useState("male");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [type, setType] = useState("");
  const [addableOnly, setAddableOnly] = useState(false);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  // TODO: convert to URLSearchParams

  return (
    <MaxWidthWrapper className="my-8 px-12">
      <div className="w-full space-y-4">
        <div className="flex justify-between gap-2 w-full text-sm font-normal">
          <div className="flex flex-col gap-4">
            <GenderSelector gender={gender} setGender={setGender} />
            <div className="flex items-center gap-2 w-28">
              <Toggle
                onPressedChange={setAddableOnly}
                className={cn(
                  "bg-white border border-muted shadow whitespace-nowrap",
                  addableOnly
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
              value={department}
              setValue={setDepartment}
              placeholder="Select Department"
              searchPlaceholder="Search department..."
              className="w-[400px]"
            />
            <div className="flex gap-4">
              <MultiSelector
                title="Select Days"
                items={DAYS}
                selected={selectedDays}
                setSelected={setSelectedDays}
                searchPlaceholder="Search days..."
                className="w-[193px]"
              />
              <MultiSelector
                title="Select Times"
                items={TIMES}
                selected={selectedTimes}
                setSelected={setSelectedTimes}
                searchPlaceholder="Search times..."
                className="w-[193px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <SingleSelector
              items={COURSES}
              value={course}
              setValue={setCourse}
              placeholder="Select Course"
              searchPlaceholder="Search course..."
              className="w-[380px]"
            />

            <MultiSelector
              title="Select Instructors"
              items={INSTRUCTORS}
              selected={selectedInstructors}
              setSelected={setSelectedInstructors}
              searchPlaceholder="Search instructors..."
              className="w-[380px]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <SingleSelector
              items={TYPES}
              value={type}
              setValue={setType}
              placeholder="Select Type"
              searchPlaceholder="Search type..."
              className="w-[200px]"
            />
            <MultiSelector
              title="Select Locations"
              items={LOCATIONS}
              selected={selectedLocations}
              setSelected={setSelectedLocations}
              searchPlaceholder="Search locations..."
              className="w-[200px]"
            />
          </div>
        </div>

        <ScheduleTable department={department} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Schedule;
