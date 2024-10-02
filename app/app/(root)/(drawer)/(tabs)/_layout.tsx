import { Tabs } from "expo-router";
import { Calendar, Home, MessagesSquare, UserIcon } from "lucide-react-native";
import React from "react";
const RootLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }} backBehavior="history">
      <Tabs.Screen
        name="(home)"
        options={{
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
        name="(chat)"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <MessagesSquare size={24} color={color} />,
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
