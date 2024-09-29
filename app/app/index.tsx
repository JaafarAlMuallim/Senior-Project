import { useAuth } from "@clerk/clerk-expo";
import { Image } from "react-native";
import { Redirect } from "expo-router";
import React from "react";
import googlex from "./googlex.png";
import { images } from "@/constants/images";

const Page = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(root)/FAQ" />;
  }
  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
