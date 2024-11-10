import { useColorScheme } from "@/hooks/useColorScheme";
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import "reflect-metadata";
import "../global.css";
import {
  httpBatchLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import { LogBox, Platform, StatusBar } from "react-native";
import { useTokenStore } from "@/store/tokenStore";
// import { initializeDB } from "@/lib/db";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(["Clerk:", "clerk:"]);
LogBox.ignoreLogs(["Warning:"]);
LogBox.ignoreLogs(["fontFamily"]);

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    PoppinsBlack: require("../assets/fonts/PoppinsBlack.ttf"),
    Poppins: require("../assets/fonts/PoppinsRegular.ttf"),
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsItalic: require("../assets/fonts/PoppinsItalic.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/PoppinsSemiBold.ttf"),
  });
  const { token } = useTokenStore();
  // const [isInitialized, setIsInitialized] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     await initializeDB();
  //     setIsInitialized(true);
  //   })();
  // }, []);

  const url = Platform.select({
    web: "http://localhost:3000/trpc",
    ios: "http://localhost:3000/trpc",
    android: "http://10.0.2.2:3000/trpc",
    default: "http://localhost:3000/trpc",
  });
  console.log("HEADERS", token.token);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: unstable_httpSubscriptionLink({
            url: url,
          }),
          false: httpBatchLink({
            url: url,
            headers: () => {
              return {
                Authorization: `Bearer ${token.token}`,
              };
            },
          }),
        }),
      ],
    }),
  );

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    console.log(loaded);
  }, [loaded]);

  console.log(loaded);

  // if (!isInitialized) {
  //   <View>
  //     <ActivityIndicator size={"large"} color={"#000"} />
  //   </View>;
  // }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <ClerkLoaded>
              <StatusBar />
              <Stack
                initialRouteName="index"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(root)" />
                <Stack.Screen
                  name="+not-found"
                  options={{ headerShown: false }}
                />
              </Stack>
            </ClerkLoaded>
          </QueryClientProvider>
        </trpc.Provider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
