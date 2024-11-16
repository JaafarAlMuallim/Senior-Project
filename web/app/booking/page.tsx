"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Check, ChevronsUpDown, Loader2, Book, UserRound } from "lucide-react";
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
import { GRADES } from "@/validators/option-validators";
import { AVAILABLE_TIMES, COURSES } from "@/validators/Placeholders";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const formSchema = z.object({
  tutor: z.string(),
  course: z.string(),
  date: z.coerce.date(),
});

const Booking = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tutor: "",
      course: "",
      date: new Date(),
    },
  });
  const uniqueDates = new Map<string, any>();
  const uniqueDatesArray = AVAILABLE_TIMES.filter((date) => {
    if (!uniqueDates.has(date.date.toDateString())) {
      uniqueDates.set(date.date.toDateString(), true);
      return true;
    }
    return false;
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("submitted");
    console.log(values);
  };

  return (
    <MaxWidthWrapper className="my-8 flex flex-col justify-center items-center gap-4">
      <Card className="w-[480px]">
        <CardHeader className="pb-2">
          <CardTitle>Request Session</CardTitle>
          <CardDescription>
            Request a tutoring session with a tutor of your choice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel htmlFor="course">Course</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild id="course">
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between w-[420px]",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <div className="flex gap-2 items-center">
                              <Book className="h-4 w-4" />
                              {field.value
                                ? COURSES.find((c) => c.value === field.value)
                                    ?.label
                                : "Select Course"}
                            </div>
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[420px]">
                          <Command>
                            <CommandInput placeholder="Search Courses..." />
                            <CommandList>
                              <CommandEmpty>No Courses Available</CommandEmpty>
                              <CommandGroup>
                                {COURSES.map((course) => (
                                  <CommandItem
                                    key={course.value}
                                    value={course.value}
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
                name="tutor"
                render={({ field }) => (
                  <FormItem className=" w-full flex flex-col gap-2">
                    <FormLabel htmlFor="tutor">Tutor</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild id="tutor">
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between w-[420px]",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <div className="flex gap-2 items-center w-[420px]">
                              <UserRound className="h-4 w-4" />
                              {field.value || "Select a Tutor"}
                            </div>
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[440px]">
                          <Command>
                            <CommandList>
                              <CommandEmpty>No Tutors Available</CommandEmpty>
                              <CommandGroup>
                                {GRADES.options.map((grade) => (
                                  <CommandItem
                                    key={grade}
                                    value={grade}
                                    onSelect={field.onChange}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        grade === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {grade}
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
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <FormControl>
                      <ScrollArea className="w-[420px] whitespace-nowrap">
                        <div className="flex w-max space-x-4 p-4">
                          <div className="flex gap-2">
                            {uniqueDatesArray.map((item) => (
                              <Button
                                key={item.date.toISOString()}
                                type="button"
                                variant="outline"
                                onClick={() => field.onChange(item.date)}
                                className={cn(
                                  "flex-shrink-0 h-20 w-16 flex flex-col gap-1 justify-center items-center p-1",
                                  item.date.toISOString() ===
                                    field.value?.toISOString()
                                    ? "bg-primary-light text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground"
                                    : "",
                                )}
                              >
                                <span className="text-lg font-semibold">
                                  {item.date.getDate()}
                                </span>
                                <span className="text-xs">
                                  {item.date.toLocaleString("default", {
                                    month: "short",
                                  })}
                                </span>
                              </Button>
                            ))}
                          </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={buttonVariants({
                  variant: "default",
                  className: "w-full bg-primary-light hover:bg-primary-dark",
                })}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Booking;
