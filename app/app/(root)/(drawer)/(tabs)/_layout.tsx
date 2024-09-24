import { Tabs } from "expo-router";
import { Calendar, Home, UserIcon } from "lucide-react-native";
import React from "react";
const RootLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(schedule)"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
