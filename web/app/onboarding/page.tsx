import OnBoarding from "@/components/OnboardingForm";
import { trpc } from "@/trpc/server";
import { RedirectToSignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const onBoardingPage = async () => {
  const user = await currentUser();
  if (!user) {
    return <RedirectToSignUp />;
  }

  const profile = trpc.profiles.get();

  if (!!profile) {
    redirect("/dashboard");
  }

  return (
    <div className="grid w-full grow items-center px-4 sm:justify-center">
      <OnBoarding />
    </div>
  );
};
export default onBoardingPage;
