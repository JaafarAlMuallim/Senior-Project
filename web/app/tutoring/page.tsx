"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TutorForm } from "./TutorForm";
import { TutorProfileCard } from "./TutorProfileCard";
import { FormValues, formSchema } from "./types";

const Tutoring = () => {
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
    <MaxWidthWrapper className="my-8 flex flex-col justify-center items-center gap-4">
      <TutorProfileCard
        name="Jaafar Al Muallim"
        email="email@EduLink.com"
        phone="+966 50 000 0000"
        institution="KFUPM - SWE"
      />
      <TutorForm form={form} onSubmit={onSubmit} />
    </MaxWidthWrapper>
  );
};

export default Tutoring;
