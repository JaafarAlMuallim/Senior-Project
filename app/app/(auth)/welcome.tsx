import CustomText from "@/components/CustomText";
import GoogleAuth from "@/components/GoogleAuth";
import { Link, router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomePage() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white-default">
      <View className="w-full px-4 flex-1 justify-center gap-8 bg-white">
        <CustomText styles={"text-2xl px-8"}>Welcome to</CustomText>
        <Text className={"text-primary-light text-5xl font-bold mt-2"}>
          EduLink
        </Text>
        <View>
          <CustomText styles={"text-xl text-wrap"}>
            A place where you can learn, grow and connect with others.
          </CustomText>
        </View>
        <Text className={"text-xl"}>Let’s Get Started...</Text>
        <View>
          <GoogleAuth />
          <TouchableOpacity
            className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-blue-def50"
            onPress={() => {
              router.push("/sign-up");
            }}
          >
            <CustomText styles="text-primary-black font-poppinsSemiBold text-lg">
              Continue with Email{" "}
            </CustomText>
            <Text className="text-primary-light text-xl font-extrabold mx-2">
              @
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-blue-def50"
            onPress={() => {
              router.push("/profile");
            }}
          >
            
          </TouchableOpacity>
        </View>
        <CustomText styles={"text-lg text-center mt-4"}>
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className={"text-primary-light font-bold underline"}
          >
            Login
          </Link>
        </CustomText>
      </View>
    </SafeAreaView>
  );
}
