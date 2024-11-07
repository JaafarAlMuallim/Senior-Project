import { googleOAuth } from "@/lib/auth";
import { useOAuth } from "@clerk/clerk-expo";
import { Alert, Image, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { images } from "@/constants/images";
import React from "react";
import { trpc } from "@/lib/trpc";

const GoogleAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { mutate: addUser } = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      Alert.alert("Success", "You have successfully signed up!");
    },
  });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);
    if (result.success) {
      addUser({
        email: result.data?.email!,
        name: result.data?.name!,
        clerkId: result.data?.clerkId!,
      });
    }

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
    }
    if (result.code === "") {
      Alert.alert(result.success ? "Success" : "Error", result.message);
    }
  };

  return (
    <TouchableOpacity
      className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-blue-def50"
      onPress={handleGoogleSignIn}
    >
      <Image source={images.googleAuth} className="w-4 h-4 mx-2" />
      <CustomText styles="text-primary-black font-poppinsSemiBold text-lg">
        Continue with Google
      </CustomText>
    </TouchableOpacity>
  );
};

export default GoogleAuth;
