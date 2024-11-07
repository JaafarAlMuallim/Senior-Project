import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";

const Page = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(root)/onboarding" />;
  }
  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
