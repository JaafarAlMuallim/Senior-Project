import BorderInput from "@/components/BorderInput";
import CustomText from "@/components/CustomText";
import { TouchableOpacity, View } from "react-native";

const Verification = () => {
  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-default text-4xl font-poppinsBold"}>
        Forget Password?
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-xl font-poppins"}>
          We have sent a verification code to your email. Please enter the code
          to reset your password.
        </CustomText>
      </View>
      <View className="flex-col mt-8">
        <BorderInput
          label={"Verification Code"}
          styles={"text-center"}
          inputConfig={{
            placeholder: "Ex: 123456",
          }}
        ></BorderInput>
      </View>
      <TouchableOpacity className="items-center justify-center mt-8 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default">
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default Verification;
