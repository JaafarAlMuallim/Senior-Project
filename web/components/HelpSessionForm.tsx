"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlus } from "lucide-react";
import SubmitButton from "@/components/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "@/components/DatePicker";
import CourseSelect from "@/components/CourseSelect";
import { add } from "date-fns";

const formSchema = z.object({
  course: z.string(),
  date: z.coerce.date(),
});

const HelpSessionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      date: add(new Date(), { days: 1 }),
    },
  });

  const onSubmitHelpSession = (values: z.infer<typeof formSchema>) => {
    console.log("submitted");
    console.log(values);
  };
  return (
    <Popover>
      <PopoverTrigger asChild id="university" className="cursor-pointer">
        <CirclePlus color="#4561FF" size={34} />
      </PopoverTrigger>

      <PopoverContent className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHelpSession)}
            className="flex flex-col gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
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
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="date">Date &amp; Time</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              text="Submit Application"
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
export default HelpSessionForm;
