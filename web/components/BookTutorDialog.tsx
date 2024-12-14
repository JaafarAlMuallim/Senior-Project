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
  time: z.string(),
});

import { trpc } from "@/trpc/client";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import { TimeSelect } from "./TimeSelect";

const TIMES = [
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

const BookTutorDialog = () => {
  const dateArr: Date[] = [];
  const [open, setOpen] = useState(false);
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    const day = currentDate.getDay();
    if (day !== 0 && day !== 6) {
      dateArr.push(currentDate);
    }
  }
  const { toast } = useToast();
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tutor: "",
      course: "",
      date: dateArr[0],
      time: TIMES[0],
    },
  });
  const utils = trpc.useUtils();
  const { data: courseTutor, isLoading: isLoading } =
    trpc.tutors.getTutorsCourse.useQuery();

  const coursesData = useMemo(() => {
    return (
      courseTutor?.map((c) => {
        return {
          id: c.course.id,
          name: c.course.name,
          createdAt: c.course.createdAt,
          updatedAt: c.course.updatedAt,
          groupId: c.course.groupId,
          code: c.course.code,
        };
      }) ?? []
    );
  }, [courseTutor])!;
  const { mutateAsync: addSession } = trpc.sessions.createSession.useMutation({
    onSuccess: () => {
      toast({
        title: "Session booked successfully",
        description:
          "Your request has been sent successfully, when the tutor accepts your request you will be notified",
        className: "bg-success-600 text-primary-white",
      });
      utils.sessions.getUserSessions.invalidate();
      setOpen(false);
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
  }, [courseTutor, form.watch("course")])!;

  useEffect(() => {
    form.setValue("tutor", "");
  }, [form.watch("course")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addSession({
      courseId: values.course,
      date: values.date!,
      requestedBy: user?.id!,
      time: values.time!,
      courseName: courseTutor!.find((ct) => ct.course.id === values.course)
        ?.course.name!,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild id="university" className="cursor-pointer">
        <Button
          className={buttonVariants({
            variant: "outline",
            className:
              "bg-primary-light text-primary-white hover:bg-primary-dark hover:text-white-default",
          })}
          onClick={() => setOpen(true)}
        >
          Book Tutor
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full md:w-[480px] lg:w-[480px]">
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
                    <DateSelect field={field} dates={dateArr} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2">
                  <FormLabel htmlFor="date">Time</FormLabel>
                  <FormControl>
                    <TimeSelect field={field} times={TIMES} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              text="Book Tutor"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default BookTutorDialog;
