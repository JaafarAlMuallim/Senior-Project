"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  COURSES,
  DAYS,
  DEPTS,
  INSTRUCTORS,
  LOCATIONS,
  TIMES,
  TYPES,
} from "@/validators/Placeholders";
import { Toggle } from "@/components/ui/toggle";

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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-28 justify-between capitalize"
                >
                  {gender}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-28 p-0">
                <Command>
                  <CommandList>
                    <CommandItem
                      onSelect={() => setGender("male")}
                      className="capitalize"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          gender === "male" ? "opacity-100" : "opacity-0",
                        )}
                      />
                      male
                    </CommandItem>
                    <CommandItem
                      onSelect={() => setGender("female")}
                      className="capitalize"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          gender === "female" ? "opacity-100" : "opacity-0",
                        )}
                      />
                      female
                    </CommandItem>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {department
                    ? DEPTS.find((dep) => dep.value === department)?.label
                    : "Select Department"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search department..." />
                  <CommandEmpty>No department found.</CommandEmpty>
                  <CommandList>
                    {DEPTS.map((dep) => (
                      <CommandItem
                        key={dep.value}
                        value={dep.value}
                        onSelect={() => setDepartment(dep.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            department === dep.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {dep.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between"
                  >
                    {`Select Instructors (${selectedInstructors.length})`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search instructors..." />
                    <CommandEmpty>No instructor found.</CommandEmpty>
                    <CommandList>
                      {INSTRUCTORS.map((instructor) => (
                        <CommandItem
                          value={instructor}
                          key={instructor}
                          onSelect={() => {
                            setSelectedInstructors((prev) =>
                              prev.includes(instructor)
                                ? prev.filter((i) => i !== instructor)
                                : [...prev, instructor],
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedInstructors.includes(instructor)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {instructor}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between"
                  >
                    {`Select Times ( ${selectedTimes.length} )`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search times..." />
                    <CommandEmpty>No time found.</CommandEmpty>
                    <CommandList>
                      {TIMES.map((time) => (
                        <CommandItem
                          key={time}
                          value={time}
                          onSelect={() => {
                            setSelectedTimes((prev) =>
                              prev.includes(time)
                                ? prev.filter((t) => t !== time)
                                : [...prev, time],
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTimes.includes(time)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {time}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {course
                    ? COURSES.find((c) => c.value === course)?.label
                    : "Select Course"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex-1 p-0">
                <Command>
                  <CommandInput placeholder="Search course..." />
                  <CommandEmpty>No course found.</CommandEmpty>
                  <CommandList>
                    {COURSES.map((c) => (
                      <CommandItem
                        key={c.value}
                        value={c.value}
                        onSelect={() => setCourse(c.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            course === c.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {c.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {`Select Days (${selectedDays.length})`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search days..." />
                  <CommandEmpty>No day found.</CommandEmpty>
                  <CommandList>
                    {DAYS.map((day) => (
                      <CommandItem
                        value={day}
                        key={day}
                        onSelect={() => {
                          setSelectedDays((prev) =>
                            prev.includes(day)
                              ? prev.filter((d) => d !== day)
                              : [...prev, day],
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedDays.includes(day)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {day}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {type
                    ? TYPES.find((t) => t.value === type)?.label
                    : "Select Type"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search type..." />
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandList>
                    {TYPES.map((t) => (
                      <CommandItem
                        key={t.value}
                        value={t.value}
                        onSelect={() => setType(t.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            type === t.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {t.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between"
                >
                  {`Select Locations ( ${selectedLocations.length} )`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search locations..." />
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandList>
                    {LOCATIONS.map((location) => (
                      <CommandItem
                        value={location}
                        key={location}
                        onSelect={() => {
                          setSelectedLocations((prev) =>
                            prev.includes(location)
                              ? prev.filter((l) => l !== location)
                              : [...prev, location],
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedLocations.includes(location)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {location}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>COURSE</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>CRN</TableHead>
                <TableHead>TITLE</TableHead>
                <TableHead>INSTRUCTOR</TableHead>
                <TableHead>DAY</TableHead>
                <TableHead>TIME</TableHead>
                <TableHead>LOCATION</TableHead>
                <TableHead>ADD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {department ? (
                <TableRow>
                  <TableCell>CS101</TableCell>
                  <TableCell>Lecture</TableCell>
                  <TableCell>12345</TableCell>
                  <TableCell>Introduction to Programming</TableCell>
                  <TableCell>Dr. Smith</TableCell>
                  <TableCell>Monday</TableCell>
                  <TableCell>10:00</TableCell>
                  <TableCell>Room 101</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="h-24 text-center">
                    Select a department to start 🔍...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Schedule;
