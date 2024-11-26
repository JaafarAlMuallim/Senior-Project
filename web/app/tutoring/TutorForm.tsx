import SubmitButton from "@/components/SubmitButton";
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
import { UseFormReturn } from "react-hook-form";
import { GradeSelect } from "./GradeSelect";
import { FormValues } from "./types";
import CourseSelect from "@/components/CourseSelect";

type TutorApplicationFormProps = {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
};

export const TutorForm = ({ form, onSubmit }: TutorApplicationFormProps) => (
  <Card className="w-[380px]">
    <CardHeader className="pb-2">
      <CardTitle>Tutor Application Form</CardTitle>
      <CardDescription>Apply to be a tutor for a course</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4 w-full"
        >
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel htmlFor="course">Course</FormLabel>
                <FormControl>
                  <CourseSelect field={field} className="w-[340px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel htmlFor="grade">Grade</FormLabel>
                <FormControl>
                  <GradeSelect field={field} className="w-[340px]" />
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
    </CardContent>
  </Card>
);
