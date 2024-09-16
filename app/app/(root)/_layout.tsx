import { Stack } from "expo-router";
const RootLayout = () => {
  return (
    <>
      <Stack initialRouteName="onboarding">
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;
