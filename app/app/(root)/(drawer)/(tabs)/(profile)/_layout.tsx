import { Redirect, Stack, router } from "expo-router";
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
          headerTitleStyle: {
            fontFamily: "PoppinsSemiBold",
            color: "#4561FF",
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="privacy-policy"
        options={{
          headerShown: true,
          title: "Privacy Policy",
          headerTitleStyle: {
            fontFamily: "PoppinsSemiBold",
            color: "#4561FF",
            fontSize: 20,
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
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
          title: "Notification",
          headerTitleStyle: {
            fontFamily: "PoppinsSemiBold",
            color: "#4561FF",
            fontSize: 20,
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          headerShown: true,
          title: "Support",
          headerTitleStyle: {
            fontFamily: "PoppinsSemiBold",
            color: "#4561FF",
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
