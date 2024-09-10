import { googleOAuth } from "@/lib/auth";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { images } from "@/constants/images";
import React from "react";

const GoogleAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/home");
    }
    if (result.code === "") {
      Alert.alert(result.success ? "Success" : "Error", result.message);
      router.replace("/(root)/home");
    }
  };

  return (
    <TouchableOpacity
      className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-blue-def50"
      onPress={handleGoogleSignIn}
    >
      <Image source={images.google} className="w-4 h-4 mx-2" />
      <CustomText styles="text-primary-black font-poppinsSemiBold text-lg">
        Continue with Google
      </CustomText>
    </TouchableOpacity>
  );
};

export default GoogleAuth;
