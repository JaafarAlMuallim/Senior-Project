import BorderInput from "@/components/BorderInput";
import CustomText from "@/components/CustomText";
import { router } from "expo-router";
import { LockKeyhole } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

const ForgetPassword = () => {
  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-default text-4xl font-poppinsBold"}>
        Forget Password?
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-xl font-poppins"}>
          Set your new password to login into your account!
        </CustomText>
      </View>
      <View className="flex-col mt-8">
        <BorderInput
          label={"Enter New Password"}
          inputConfig={{
            placeholder: "**********",
          }}
        >
          <LockKeyhole />
        </BorderInput>

        <BorderInput
          label={"Confirm Password"}
          inputConfig={{
            placeholder: "**********",
          }}
        >
          <LockKeyhole />
        </BorderInput>
      </View>
      <TouchableOpacity
        className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
        onPress={() => {
          router.push("/verification");
        }}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Confirm
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;
