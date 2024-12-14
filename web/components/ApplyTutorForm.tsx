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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ApplyTutorForm = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      grade: undefined,
      checkbox: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    toast({
      title: "Application Sent",
      description: "Your tutor application has been sent successfully.",
      className: "bg-success-600 text-primary-white",
    });
    setOpen(false);
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild id="apply" className="cursor-pointer">
        <Button onClick={() => setOpen(true)} variant="outline">
          Start Teaching Students!
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[440px]">
        <DialogTitle>Start Tutoring</DialogTitle>
        <DialogDescription>
          Apply to be a tutor and help students in your community.
        </DialogDescription>
        <div className="flex flex-col justify-center items-center gap-4">
          <TutorProfileCard
            name="Jaafar Al Muallim"
            email="email@EduLink.com"
            phone="+966 50 000 0000"
            institution="KFUPM - SWE"
          />
          <TutorForm form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyTutorForm;
