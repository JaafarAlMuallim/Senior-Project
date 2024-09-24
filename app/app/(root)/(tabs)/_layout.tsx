import { Tabs } from "expo-router";
import { Home } from "lucide-react-native";
const RootLayout = () => {
  return (
    <Tabs initialRouteName="creating">
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="creating"
        options={{
          headerShown: true,
          title: "Add Course",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
