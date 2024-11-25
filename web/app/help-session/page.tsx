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
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { add } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CourseSelect } from "./CourseSelect";
import { DateSelect } from "./DateSelect";

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
          <CardDescription>
            Create Help Session For All Student Enrolled In A Course
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 w-full">
              <CourseSelect field={form.getValues("course")} form={form} />
              <DateSelect field={form.getValues("date")} form={form} />
              <SubmitButton isSubmitting={form.formState.isSubmitting} text="Submit Application" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};

export default HelpSession;
