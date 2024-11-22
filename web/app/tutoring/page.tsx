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
import {
  Check,
  ChevronsUpDown,
  Loader2,
  Book,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";
import { Grade } from "@/models/grades";
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
import { COURSES } from "@/validators/Placeholders";

const formSchema = z.object({
  course: z.string(),
  grade: z.nativeEnum(Grade),
  checkbox: z.boolean(),
});

const Tutoring = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      grade: undefined,
      checkbox: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("submitted");
    console.log(values);
  };

  return (
    <MaxWidthWrapper className="my-8 flex flex-col justify-center items-center gap-4">
      <Card id= "onboarding-tutoring" className="w-[380px] bg-primary-light text-white">
        <CardHeader className="pb-2">
          <CardTitle>Jaafar Al Muallim</CardTitle>
          <CardDescription className="text-secondary-lightGray flex justify-between items-center">
            <span>email@EduLink.com</span>
            <span>+966 50 000 0000</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="flex justify-start items-center gap-2">
            <BriefcaseBusiness /> KFUPM - SWE
          </div>
        </CardContent>
      </Card>

      <Card className="w-[380px]">
        <CardHeader className="pb-2">
          <CardTitle>Tutor Application Form</CardTitle>
          <CardDescription className="">
            Apply to be a tutor for a course
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
                                "relative flex justify-between items-center text-start w-full",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <div className="flex gap-2 items-center">
                                <Book />
                                {field.value
                                  ? `${COURSES.find((c) => c.value === field.value)?.label}`
                                  : "Select Course"}
                              </div>
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
                  name="grade"
                  render={({ field }) => (
                    <FormItem className="w-full flex gap-4 justify-start items-center">
                      <FormLabel htmlFor="grade" className="w-24">
                        Grade
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild id="course">
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "relative flex justify-between items-center text-start w-full",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <div className="flex gap-2 items-center">
                                <GraduationCap />

                                {field.value
                                  ? `${field.value}`
                                  : "Select Your Grade"}
                              </div>
                              <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandList>
                                <CommandEmpty>No Grades Available</CommandEmpty>
                                <CommandGroup>
                                  {GRADES.options.map((grade) => (
                                    <CommandItem
                                      value={grade}
                                      key={grade}
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

export default Tutoring;
