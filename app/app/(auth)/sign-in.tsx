import CustomText from "@/components/CustomText";
import GoogleAuth from "@/components/GoogleAuth";
import Input from "@/components/Input";
import { useTokenStore } from "@/store/tokenStore";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Mail, LockKeyhole } from "lucide-react-native";
import React from "react";
import { useState, useCallback } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { setToken } = useTokenStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn?.create({
        identifier: email,
        password,
      });
      if (signInAttempt?.status === "complete") {
        await setActive!({ session: signInAttempt.createdSessionId });
        router.push("/(root)/home");
        setToken({ token: signInAttempt.id! });
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, email, password]);

  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-light text-4xl font-poppinsBold"}>
        Login
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-lg font-poppins"}>
          Login to your{" "}
          <CustomText styles="text-x text-primary-default font-poppinsSemiBold">
            account
          </CustomText>{" "}
          to access all the features of{" "}
          <CustomText styles="text-1x text-black font-poppinsSemiBold">
            EduLink
          </CustomText>
        </CustomText>
      </View>
      <View className="flex-col mt-8">
        <Input
          label={"Email"}
          inputConfig={{
            placeholder: "Ex: abc@example.com",
            onChangeText: setEmail,
            value: email,
            textContentType: "emailAddress",
          }}
        >
          <Mail />
        </Input>
        <Input
          label={"Password"}
          inputConfig={{
            placeholder: "**********",
            onChangeText: setPassword,
            value: password,
            textContentType: "password",
            secureTextEntry: true,
          }}
        >
          <LockKeyhole />
        </Input>
        <Link
          href={"/forget-password"}
          className={"text-primary-light underline font-poppinsBold"}
        >
          Forget Password?
        </Link>
      </View>
      <TouchableOpacity
        className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light"
        onPress={onSignIn}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
      <GoogleAuth />
      <View className="flex-1">
        <CustomText styles={"text-xl mt-5 text-center"}>
          Don't have an account?{" "}
          <Link
            href={"/sign-up"}
            className={"text-primary-light underline font-poppinsBold"}
          >
            Register
          </Link>
        </CustomText>
      </View>
    </View>
  );
};

export default SignIn;
