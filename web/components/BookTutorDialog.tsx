"use client";
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
import CourseSelect from "@/components/CourseSelect";
import { Button, buttonVariants } from "@/components/ui/button";
import { DateSelect } from "@/components/DateSelect";
import TutorSelect from "@/components/TutorSelect";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  tutor: z.string(),
  course: z.string(),
  date: z.coerce.date(),
});

import { AVAILABLE_TIMES } from "@/validators/Placeholders";
import { getUniqueDates } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";

const BookTutorDialog = () => {
  const { toast } = useToast();
  const uniqueDatesArray = getUniqueDates(AVAILABLE_TIMES);
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tutor: "",
      course: "",
      date: new Date(),
    },
  });
  const { data: courseTutor, isLoading: isLoading } =
    trpc.tutors.getTutorsCourse.useQuery();

  const coursesData = useMemo(() => {
    const uniqueCourses = new Map<string, any>();
    courseTutor?.forEach((courseTutor) => {
      uniqueCourses.set(courseTutor.course.id, courseTutor);
    });

    return Array.from(uniqueCourses.values()).map((courseTutor) => ({
      label: courseTutor.course.name,
      value: courseTutor.course.id,
    }));
  }, [courseTutor])!;
  const { mutateAsync: addSession } = trpc.sessions.createSession.useMutation({
    onSuccess: () => {
      toast({
        title: "Session booked successfully",
        description: "Your session has been booked successfully",
        className: "bg-success-600 text-primary-white",
      });
    },
    onError: (e: any) => {
      toast({
        title: "Session booking failed",
        description: e.message,
        className: "bg-danger-600 text-primary-white",
      });
    },
  });

  const tutorsData = useMemo(() => {
    return courseTutor
      ?.filter(
        (courseTutor) => courseTutor.course.id === form.getValues("course"),
      )
      ?.map((courseTutor) => ({
        label: courseTutor.tutor.user.name,
        value: courseTutor.tutorId,
      }));
  }, [courseTutor, form.getValues("course")])!;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addSession({
      courseId: values.course,
      date: values.date!,
      requestedBy: user?.id!,
      time: AVAILABLE_TIMES.find((time) => time.date === values.date)?.time!,
      courseName: courseTutor!.find((ct) => ct.course.id === values.course)
        ?.course.name!,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild id="university" className="cursor-pointer">
        <Button
          className={buttonVariants({
            variant: "outline",
            className:
              "bg-primary-light hover:bg-primary-dark hover:text-white",
          })}
        >
          Book Tutor
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[480px]">
        <DialogTitle>Book Tutor</DialogTitle>
        <DialogDescription>
          Start a tutoring session with a tutor in the desired course
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 w-full">
                  <FormLabel htmlFor="course">Course</FormLabel>
                  <FormControl>
                    <CourseSelect
                      field={field}
                      data={coursesData}
                      className="w-full"
                    />
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
                    <TutorSelect
                      field={field}
                      className="w-full"
                      data={tutorsData}
                    />
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
            <SubmitButton isSubmitting={form.formState.isSubmitting} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default BookTutorDialog;
