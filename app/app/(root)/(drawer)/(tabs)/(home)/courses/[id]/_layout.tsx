import { Redirect, router, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="[folder]"
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="upload"
        options={{
          headerShown: true,
          title: "Upload Files",
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "Poppins-Bold",
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
