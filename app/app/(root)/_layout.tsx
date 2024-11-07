import React from "react";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { Toaster } from "@/components/ui/toast";

const RootLayout = () => {
  return (
    <>
      <Stack
        initialRouteName="onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
      <Toaster />
      <PortalHost />
    </>
  );
};

export default RootLayout;
