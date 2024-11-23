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
import { GenderSelector } from "./gender-selector";
import { MultiSelector } from "./multi-selector";
import { SingleSelector } from "./single-selector";
import { ScheduleTable } from "./table";

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

  return (
    <MaxWidthWrapper className="my-8 px-12">
      <div className="w-full space-y-4">
        <div className="flex justify-between gap-2 w-full text-sm font-normal">
          <div className="flex flex-col gap-4">
            <GenderSelector gender={gender} setGender={setGender} />
            <div className="flex items-center gap-2 w-28">
              <Toggle
                onPressedChange={setAddableOnly}
                className="bg-white border border-muted shadow whitespace-nowrap"
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
            />
            <div className="flex gap-4">
              <MultiSelector
                title="Select Instructors"
                items={INSTRUCTORS}
                selected={selectedInstructors}
                setSelected={setSelectedInstructors}
                searchPlaceholder="Search instructors..."
              />
              <MultiSelector
                title="Select Times"
                items={TIMES}
                selected={selectedTimes}
                setSelected={setSelectedTimes}
                searchPlaceholder="Search times..."
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
            />
            <MultiSelector
              title="Select Days"
              items={DAYS}
              selected={selectedDays}
              setSelected={setSelectedDays}
              searchPlaceholder="Search days..."
            />
          </div>

          <div className="flex flex-col gap-4">
            <SingleSelector
              items={TYPES}
              value={type}
              setValue={setType}
              placeholder="Select Type"
              searchPlaceholder="Search type..."
            />
            <MultiSelector
              title="Select Locations"
              items={LOCATIONS}
              selected={selectedLocations}
              setSelected={setSelectedLocations}
              searchPlaceholder="Search locations..."
            />
          </div>
        </div>

        <ScheduleTable department={department} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Schedule;
