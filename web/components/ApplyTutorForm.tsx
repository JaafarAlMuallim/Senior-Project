"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TutorForm } from "./TutorForm";
import { TutorProfileCard } from "./TutorProfileCard";
import { FormValues, formSchema } from "./types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";

const ApplyTutorForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      grade: undefined,
      checkbox: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("submitted");
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild id="apply" className="cursor-pointer">
        <Button variant="outline">Start Teaching Students!</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Start Tutoring</DialogTitle>
        <DialogDescription>
          Apply to be a tutor and help students in your community.
        </DialogDescription>
        <TutorProfileCard
          name="Jaafar Al Muallim"
          email="email@EduLink.com"
          phone="+966 50 000 0000"
          institution="KFUPM - SWE"
        />
        <TutorForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default ApplyTutorForm;
