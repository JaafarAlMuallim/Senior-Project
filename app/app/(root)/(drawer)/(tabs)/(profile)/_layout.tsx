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
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
        }}
      />

      <Stack.Screen
        name="faq"
        options={{
          headerShown: true,
          title: "FAQs",
        }}
      />

      <Stack.Screen
        name="privacy-policy"
        options={{
          headerShown: true,
          title: "Privacy & Policy",
        }}
      />
      <Stack.Screen
        name="(edit)"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          headerShown: true,
          title: "notification",
          headerTintColor: "#304FFE",
        }}
          />
       <Stack.Screen
              name="support"
              options={{
                  headerShown: true,
                  title: "support",
                  headerTintColor: "#304FFE",
              }}
          />
    </Stack>
  );
};

export default Layout;
