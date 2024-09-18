<<<<<<< HEAD
import { Tabs } from "expo-router";
import { Home } from "lucide-react-native";
import React from "react";

=======
import { Stack } from "expo-router";
>>>>>>> 011af8b462a5aff4a136f03feb6717eaada3e509
const RootLayout = () => {
  return (
    <Stack initialRouteName="onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
