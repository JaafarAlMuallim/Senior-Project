import { images } from "@/constants/images";
import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomePage() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="w-full px-8 flex-1 justify-center gap-8">
        <Text className={"text-2xl font-normal"}>Welcome to</Text>
        <Text className={"text-primary-default text-5xl font-bold mt-2"}>
          EduLink
        </Text>
        <View>
          <Text className={"text-1xl"}>
            A place where you can track all your
          </Text>
          <Text className={"text-1xl"}>expenses and incomes...</Text>
        </View>
        <Text className={"text-1xl"}>Let’s Get Started...</Text>
        <View>
          <TouchableOpacity className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-blue-def50">
            <Image
              source={require("@/assets/images/google.png")}
              className="w-4 h-4 mx-2"
            />
            <Text className="text-primary-black font-medium">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl bg-bluedef50 flex-wrap flex-row bg-blue-def50">
            <Text className="text-primary-black text-1xl font-medium">
              Continue with Email
            </Text>
            <Text className="text-primary-default text-1xl font-extrabold mx-2">
              @
            </Text>
          </TouchableOpacity>
        </View>

        <Text className={"text-1xl mt-5 text-center"}>
          Already have an account?{" "}
          <Text className={"text-primary-default font-bold underline"}>
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
