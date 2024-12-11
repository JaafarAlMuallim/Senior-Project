"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Button, buttonVariants } from "./ui/button";
import { trpc } from "@/trpc/client";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  course: z.string(),
  date: z.coerce.date(),
});

const HelpSessionForm = () => {
  const utils = trpc.useUtils();
  const { data: tutorCourse, isLoading } =
    trpc.tutors.getTutorsCourse.useQuery();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      date: add(new Date(), { days: 1 }),
    },
  });
  const user = useAuth();
  const [open, setOpen] = useState(false);

  const courses = useMemo(() => {
    return tutorCourse
      ?.map((tc) => (tc.tutor.user.clerkId === user.userId ? tc.course : null))
      .filter((c) => c !== null);
  }, [tutorCourse]);

  const { mutateAsync: addSession } = trpc.sessions.createSession.useMutation({
    onSuccess: () => {
      toast({
        title: "Session booked successfully",
        description:
          "Your request has been sent successfully, when the tutor accepts your request you will be notified",
        className: "bg-success-600 text-primary-white",
      });
      setOpen(false);
      utils.sessions.getUserSessions.invalidate();
      router.refresh();
    },
    onError: (e: any) => {
      toast({
        title: "Session booking failed",
        description: e.message,
        className: "bg-danger-600 text-primary-white",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addSession({
      courseId: values.course,
      date: values.date!,
      requestedBy: null,
      status: "ACCEPTED",
      time: values.date!.toISOString().split("T")[1].substring(0, 5),
      courseName: courses?.find((ct) => ct.id === values.course)?.name!,
    });
  };
  if (isLoading) {
    return <Loader />;
  }
  if (!courses) {
    return <div>No courses available</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id="university" className="cursor-pointer">
        <Button
          className={buttonVariants({
            variant: "outline",
            className: "text-black",
          })}
          onClick={() => setOpen(true)}
        >
          New Help Session
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="course">Course</FormLabel>
                  <FormControl>
                    <CourseSelect field={field} data={courses} />
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
