import React from "react";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <>
      <Stack
        initialRouteName="FAQ"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="FAQ" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </>
  );
};

export default RootLayout;
