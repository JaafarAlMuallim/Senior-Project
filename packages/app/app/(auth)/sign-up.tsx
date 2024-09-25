import CustomText from "@/components/CustomText";
import Input from "@/components/Input";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Mail, UserRound, LockKeyhole, ShieldCheck } from "lucide-react-native";
import { useState } from "react";
import { Alert, Modal, TouchableOpacity, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import trpc from "@/utils/trpc";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const { mutate: addUser } = useMutation({
    mutationKey: ["signUp", email],
    mutationFn: (clerkId: string) =>
      trpc.signUp.mutate({ email, name, clerkId }),
    onSuccess: () => {
      Alert.alert("Success", "You have successfully signed up!");
    },
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      const [firstName, lastName] = name.split(" ");
      await signUp?.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
    setPendingVerification(true);
  };

  const onPressVerifiy = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp?.status === "complete") {
        await setActive!({ session: completeSignUp?.createdSessionId });
        addUser(signUp.createdUserId!);
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-light text-4xl font-poppinsBold"}>
        Register
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-lg font-poppins"}>
          Create an{" "}
          <CustomText styles="text-xl text-primary-light font-poppinsSemiBold">
            account
          </CustomText>{" "}
          to access all the features of{" "}
          <CustomText styles="text-1x text-black font-poppinsSemiBold">
            EduLink!
          </CustomText>
        </CustomText>
      </View>
      <View className="flex flex-col mt-5">
        <Input
          label={"Email"}
          inputConfig={{
            placeholder: "Ex: abc@example.com",
            value: email,
            textContentType: "emailAddress",
            onChangeText: setEmail,
          }}
        >
          <Mail />
        </Input>
        <Input
          label={"Name"}
          inputConfig={{
            placeholder: "Ex: Mohammad Ali",
            value: name,
            textContentType: "name",
            onChangeText: setName,
          }}
        >
          <UserRound />
        </Input>
        <Input
          label={"Password"}
          inputConfig={{
            placeholder: "**********",
            secureTextEntry: true,
            value: password,
            textContentType: "password",
            onChangeText: setPassword,
          }}
        >
          <LockKeyhole />
        </Input>
      </View>
      <TouchableOpacity
        className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light"
        onPress={() => {
          onSignUpPress();
        }}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
      <Modal visible={pendingVerification}>
        <View className="h-full w-full px-4 flex-1 bg-white-default py-8 justify-center">
          <CustomText styles={"text-lg font-poppins mb-6"}>
            You will receive a verification code on your email. Please enter the
            code below.
          </CustomText>
          <Input
            label={"Verification Code"}
            inputConfig={{
              placeholder: "Enter the code",
              value: code,
              onChangeText: setCode,
            }}
          >
            <ShieldCheck />
          </Input>
          <TouchableOpacity
            className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light"
            onPress={onPressVerifiy}
          >
            <CustomText styles="text-primary-white font-poppinsBold text-lg">
              Verify
            </CustomText>
          </TouchableOpacity>
        </View>
      </Modal>
      <View className="flex-1">
        <CustomText styles={"text-l mt-4 text-center"}>
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className={"text-primary-light underline font-poppinsBold"}
          >
            Login
          </Link>
        </CustomText>
      </View>
    </View>
  );
};

export default SignUp;
