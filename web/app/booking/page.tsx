"use client";
import { SubmitButton } from "@/components/ SubmitButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AVAILABLE_TIMES } from "@/validators/Placeholders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseSelect } from "./CourseSelect";
import { DateSelect } from "./DateSelect";
import { getUniqueDates } from "./getUniqueDates";
import { TutorSelect } from "./TutorSelect";

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

  const uniqueDatesArray = getUniqueDates(AVAILABLE_TIMES);

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-4 py-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel htmlFor="course">Course</FormLabel>
                    <FormControl>
                      <CourseSelect field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tutor"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel htmlFor="tutor">Tutor</FormLabel>
                    <FormControl>
                      <TutorSelect field={field} />
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
                      <DateSelect field={field} dates={uniqueDatesArray} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton isSubmitting={form.formState.isSubmitting}  />
            </form>
          </Form>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Booking;
