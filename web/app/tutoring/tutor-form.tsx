import { SubmitButton } from "@/components/ SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CourseSelect } from "./course-select";
import { GradeSelect } from "./grade-select";
import { FormValues } from "./types";

type TutorApplicationFormProps = {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
};

export const TutorApplicationForm = ({ 
  form, 
  onSubmit 
}: TutorApplicationFormProps) => (
  <Card className="w-[380px]">
    <CardHeader className="pb-2">
      <CardTitle>Tutor Application Form</CardTitle>
      <CardDescription>Apply to be a tutor for a course</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 w-full">
          <CourseSelect form={form} />
          <GradeSelect form={form} />
          <SubmitButton isSubmitting={form.formState.isSubmitting} text="Submit Application" />
        </form>
      </Form>
    </CardContent>
  </Card>
);