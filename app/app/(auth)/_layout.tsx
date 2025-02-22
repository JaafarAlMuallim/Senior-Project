import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";

const Layout = () => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          headerShown: false,
          title: "Welcome",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: true,
          title: "",
          headerTintColor: "#304FFE",
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: true,
          title: "",
          headerTintColor: "#304FFE",
        }}
      />
      <Stack.Screen
        name="forget-password"
        options={{
          headerShown: true,
          title: "",
          headerTintColor: "#304FFE",
        }}
      />
    </Stack>
  );
};

export default Layout;
