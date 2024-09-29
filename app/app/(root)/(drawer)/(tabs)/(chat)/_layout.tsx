import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";

const Layout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="chats"
        options={{
          headerShown: false,
          title: "Chats",
        }}
      />
      <Stack.Screen
        name="(message)"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default Layout;
