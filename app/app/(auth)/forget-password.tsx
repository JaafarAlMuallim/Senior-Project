import BorderInput from "@/components/BorderInput";
import CustomText from "@/components/CustomText";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { LockKeyhole, Mail } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import React from "react";

const ForgetPassword = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [code, setCode] = useState("");
  const [tOTP, settOTP] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/");
  }

  const ResetCode = async () => {
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError("");
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const ResetPassword = async () => {
    try {
      if (password !== passwordConf) {
        setError("Passwords do not match");
        return;
      }
      const signInAttempt = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (signInAttempt!.status === "needs_second_factor") {
        setSecondFactor(true);
        setError("");
      } else if (signInAttempt!.status === "complete") {
        await setActive({ session: signInAttempt!.createdSessionId });
        router.push("/(root)/home");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const ResetSecondFactor = useCallback(async () => {
    try {
      const secondFactorAttempt = await signIn?.attemptSecondFactor({
        strategy: "totp",
        code,
      });
      if (secondFactorAttempt!.status === "complete") {
        await setActive({ session: secondFactorAttempt!.createdSessionId });
        router.push("/(root)/home");
      } else {
        console.log(JSON.stringify(secondFactorAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, email, password, code]);

  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-light text-4xl font-poppinsBold"}>
        Forget Password?
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-xl font-poppins"}>
          Set your new password to login into your account!
        </CustomText>
      </View>
      {!successfulCreation && (
        <View className="flex-col mt-8">
          <BorderInput
            label={"Enter Email"}
            inputConfig={{
              placeholder: "Ex: abc@example.com",
              onChangeText: setEmail,
              value: email,
              textContentType: "emailAddress",
            }}
          >
            <Mail />
          </BorderInput>
          <TouchableOpacity
            className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
            onPress={ResetCode}
          >
            <CustomText styles="text-primary-white font-poppinsBold text-lg">
              Send Password Reset Code
            </CustomText>
            {error && (
              <CustomText styles="text-danger-default font-poppinsBold text-lg">
                {error}
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
      )}
      {successfulCreation && (
        <View className="flex-col mt-8">
          <View className="mt-4">
            <CustomText styles={"text-xl font-poppins"}>
              We have sent a verification code to your email. Please enter the
              code to reset your password.
            </CustomText>
          </View>
          <BorderInput
            label={"Code"}
            styles="flex justify-center items-center"
            inputConfig={{
              placeholder: "123456",
              onChangeText: setCode,
              value: code,
              textContentType: "oneTimeCode",
            }}
          />
          <BorderInput
            label={"Enter New Password"}
            inputConfig={{
              placeholder: "**********",
              onChangeText: setPassword,
              value: password,
              secureTextEntry: true,
              textContentType: "password",
            }}
          >
            <LockKeyhole />
          </BorderInput>
          <BorderInput
            label={"Confirm Password"}
            inputConfig={{
              placeholder: "**********",
              onChangeText: setPasswordConf,
              value: passwordConf,
              secureTextEntry: true,
              textContentType: "password",
            }}
          >
            <LockKeyhole />
          </BorderInput>
          <TouchableOpacity
            className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
            onPress={ResetPassword}
          >
            <CustomText styles="text-primary-white font-poppinsBold text-lg">
              Confirm
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
      {successfulCreation && secondFactor && (
        <View className="flex justify-center items-center">
          <BorderInput
            label={"OTP"}
            styles="flex justify-center items-center"
            inputConfig={{
              placeholder: "123456",
              onChangeText: settOTP,
              value: tOTP,
              textContentType: "oneTimeCode",
            }}
          />
          <TouchableOpacity
            className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
            onPress={ResetSecondFactor}
          >
            <CustomText styles="text-primary-white font-poppinsBold text-lg">
              Update Password
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ForgetPassword;
