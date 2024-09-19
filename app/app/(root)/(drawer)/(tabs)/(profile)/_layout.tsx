import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";

const Layout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="edit-profile"
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
