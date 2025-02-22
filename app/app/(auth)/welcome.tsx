import CustomText from "@/components/CustomText";
import GoogleAuth from "@/components/GoogleAuth";
import { Link, router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomePage() {
  return (
    <SafeAreaView className="px-8 flex-1 items-center justify-center bg-white-default h-full">
      <View className="w-full px-4 flex-1 justify-center bg-white h-full">
        <CustomText styles={"text-2xl my-2"}>Welcome to</CustomText>
        <CustomText
          styles={"text-primary-light text-4xl font-poppinsSemiBold my-2"}
        >
          EduLink
        </CustomText>
        <View>
          <CustomText styles={"text-xl text-wrap"}>
            A place where you can learn, grow and connect with others.
          </CustomText>
        </View>
        <CustomText styles={"text-xl my-8"}>Let’s Get Started...</CustomText>
        <View>
          <GoogleAuth />
          <TouchableOpacity
            className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-blue-def50 mb-6"
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
        </View>
        <CustomText styles={"text-lg text-center flex flex-row gap-2 text-sm"}>
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
