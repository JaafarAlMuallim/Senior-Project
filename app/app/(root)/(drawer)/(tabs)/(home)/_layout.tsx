import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ArrowDownNarrowWide } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Layout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="help-sessions"
        options={{
          title: "Help Sessions",
          headerShown: true,
          presentation: "modal",
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
        }}
      />
      <Stack.Screen
        name="requests"
        options={{
          title: "Tutoring Requests",
          headerShown: true,
          presentation: "modal",
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
