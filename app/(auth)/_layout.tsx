import { Stack } from "expo-router";

const Layout = () => {
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
      <Stack.Screen
        name="verification"
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
