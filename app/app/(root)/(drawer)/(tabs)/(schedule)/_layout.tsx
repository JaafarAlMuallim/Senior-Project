import { Redirect, router, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownRnr";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Check } from "lucide-react-native";
import { cn } from "@/lib/utils";

const Layout = () => {
  const { isSignedIn } = useAuth();
  const [term, setTerm] = React.useState("241");

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="schedule"
        options={{
          headerShown: true,
          title: "Schedule",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("create-schedule")}
              className="bg-primary-white p-0.5 rounded-full border-2 border-primary-dark"
            >
              <Ionicons name="add" size={18} color="#3044FF" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-16 justify-center items-center bg-fill-default/20 rounded-lg">
                  <CustomText styles="font-poppinsBold font-bold text-primary-dark justify-center">
                    {term}
                  </CustomText>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                insets={contentInsets}
                className="w-64 bg-white-default"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    closeOnPress
                    onPress={() => {
                      setTerm("241");
                    }}
                    className={cn(
                      "flex justify-start items-center bg-white flex-row rounded-md",
                      term === "241" ? "bg-zinc-200/80" : "",
                    )}
                  >
                    <View className="flex flex-row justify-center items-center">
                      <Check color={term === "241" ? "blue" : "white"} />
                      <CustomText styles="ml-4 text-lg">241</CustomText>
                    </View>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    closeOnPress
                    onPress={() => {
                      setTerm("242");
                    }}
                    className={cn(
                      "flex justify-start items-center bg-white flex-row rounded-md",
                      term === "242" ? "bg-zinc-200/80" : "",
                    )}
                  >
                    <View className="flex flex-row justify-center items-center">
                      <Check color={term === "242" ? "blue" : "white"} />
                      <CustomText styles="ml-4 text-lg">242</CustomText>
                    </View>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      "flex justify-start items-center bg-white flex-row rounded-md",
                      term === "243" ? "bg-zinc-200/80" : "",
                    )}
                    closeOnPress
                    onPress={() => {
                      setTerm("243");
                    }}
                  >
                    <View className="flex flex-row justify-center items-center">
                      <Check color={term === "243" ? "blue" : "white"} />
                      <CustomText styles="ml-4 text-lg">243</CustomText>
                    </View>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          headerTitleStyle: {
            fontFamily: "PoppinsSemiBold",
            color: "#4561FF",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="create-schedule"
        options={{
          headerShown: true,
          presentation: "modal",
          title: "Add Courses",
        }}
      />
    </Stack>
  );
};

export default Layout;
