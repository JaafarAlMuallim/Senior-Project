import CustomText from "@/components/CustomText";
import Input from "@/components/Input";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Mail, LockKeyhole } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-default text-4xl font-poppinsBold"}>
        Login
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-xl font-poppins"}>
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
          }}
        >
          <Mail />
        </Input>
        <Input
          label={"Password"}
          inputConfig={{
            placeholder: "**********",
          }}
        >
          <LockKeyhole />
        </Input>
        <Link
          href={"/forget-password"}
          className={"text-primary-default underline font-poppinsBold"}
        >
          Forget Password?
        </Link>
      </View>
      <TouchableOpacity className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default">
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row border border-primary-light mb-24">
        <Image source={images.google} className="w-4 h-4 mx-2" />
        <CustomText styles="text-primary-black font-poppinsSemiBold text-lg">
          Continue with Google
        </CustomText>
      </TouchableOpacity>
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
