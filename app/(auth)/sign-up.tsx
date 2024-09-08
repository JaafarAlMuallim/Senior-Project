import CustomText from "@/components/CustomText";
import Input from "@/components/Input";
import { Link } from "expo-router";
import { Mail, UserRound, LockKeyhole } from "lucide-react-native";
import { View } from "react-native";

const SignUp = () => {
  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-default text-4xl font-poppinsBold"}>
        Register
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-xl font-poppins"}>
          Create an{" "}
          <CustomText styles="text-x text-primary-default font-poppinsSemiBold">
            account
          </CustomText>{" "}
          to access all the features of{" "}
          <CustomText styles="text-1x text-black font-poppinsSemiBold">
            EduLink
          </CustomText>
        </CustomText>
      </View>
      <View className="flex-1 flex-col mt-8">
        <Input
          label={"Email"}
          inputConfig={{
            placeholder: "Ex: abc@example.com",
          }}
        >
          <Mail />
        </Input>
        <Input
          label={"Name"}
          inputConfig={{
            placeholder: "Ex: Mohammad Ali",
          }}
        >
          <UserRound />
        </Input>
        <Input
          label={"Password"}
          inputConfig={{
            placeholder: "**********",
          }}
        >
          <LockKeyhole />
        </Input>
      </View>
      <View className="flex-1">
        <CustomText styles={"text-xl mt-5 text-center"}>
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className={"text-primary-default underline font-poppinsBold"}
          >
            Login
          </Link>
        </CustomText>
      </View>
    </View>
  );
};

export default SignUp;
