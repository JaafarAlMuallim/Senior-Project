"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { add, format } from "date-fns";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  ChevronsUpDown,
  Loader2,
  Book,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandEmpty,
  CommandGroup,
  Command,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { COURSES } from "@/validators/Placeholders";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  course: z.string(),
  date: z.coerce.date(),
});

const HelpSession = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      date: add(new Date(), { days: 1 }),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("submitted");
    console.log(values);
  };

  return (
    <MaxWidthWrapper className="my-8 flex flex-col justify-center items-center gap-4">
      <Card className="w-[440px]">
        <CardHeader className="pb-2">
          <CardTitle>Help Session Form</CardTitle>
          <CardDescription className="">
            Create Help Session For All Student Enrolled In A Course
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 py-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="w-full flex gap-4 justify-start items-center">
                      <FormLabel htmlFor="course" className="w-24">
                        Course
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild id="course">
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full relative flex justify-between items-center text-start",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? `${COURSES.find((c) => c.value === field.value)?.label}`
                                : "Select Course"}
                              <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Search Courses..." />
                              <CommandList>
                                <CommandEmpty>
                                  No Courses Available
                                </CommandEmpty>
                                <CommandGroup>
                                  {COURSES.map((course) => (
                                    <CommandItem
                                      value={course.value}
                                      key={course.value}
                                      onSelect={field.onChange}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          course.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {course.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full flex gap-4 justify-start items-center">
                      <FormLabel htmlFor="grade" className="w-24">
                        Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full relative flex justify-between items-center text-start",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                          <div className="p-3 border-t border-border">
                            <div className="flex items-center justify-between">
                              <Clock className="h-4 w-4 opacity-50" />
                              <div className="flex flex-row gap-2">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-[80px] flex justify-between items-center"
                                    >
                                      {field.value
                                        .getHours()
                                        .toString()
                                        .padStart(2, "0") || "Hour"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="p-0 w-[100px]">
                                    <Command>
                                      <CommandList>
                                        <CommandGroup>
                                          {Array.from({ length: 24 }).map(
                                            (_, index) => (
                                              <CommandItem
                                                key={index}
                                                value={index
                                                  .toString()
                                                  .padStart(2, "0")}
                                                onSelect={(hour) => {
                                                  const newDate = new Date(
                                                    field.value,
                                                  );
                                                  newDate.setHours(
                                                    parseInt(hour),
                                                  );
                                                  field.onChange(newDate);
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    index ===
                                                      field.value.getHours()
                                                      ? "opacity-100"
                                                      : "opacity-0",
                                                  )}
                                                />
                                                {index
                                                  .toString()
                                                  .padStart(2, "0")}
                                              </CommandItem>
                                            ),
                                          )}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-[70px] flex justify-between items-center"
                                    >
                                      {field.value
                                        .getMinutes()
                                        .toString()
                                        .padStart(2, "0") || "Min"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="p-0 w-[100px]">
                                    <Command>
                                      <CommandList>
                                        <CommandGroup>
                                          {Array.from({ length: 60 }).map(
                                            (_, index) => (
                                              <CommandItem
                                                key={index}
                                                value={index
                                                  .toString()
                                                  .padStart(2, "0")}
                                                onSelect={(minute) => {
                                                  const newDate = new Date(
                                                    field.value,
                                                  );
                                                  newDate.setMinutes(
                                                    parseInt(minute),
                                                  );
                                                  field.onChange(newDate);
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    index ===
                                                      field.value.getMinutes()
                                                      ? "opacity-100"
                                                      : "opacity-0",
                                                  )}
                                                />
                                                {index
                                                  .toString()
                                                  .padStart(2, "0")}
                                              </CommandItem>
                                            ),
                                          )}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <Button
                type="submit"
                className={buttonVariants({
                  variant: "default",
                  className: "w-full bg-primary-light hover:bg-primary-dark",
                })}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-6 w-6" />
                ) : (
                  "Submit Application"
                )}
              </Button>
            </Form>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};

export default HelpSession;
