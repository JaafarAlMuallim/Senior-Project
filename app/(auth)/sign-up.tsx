import CustomText from "@/components/CustomText";
import Input from "@/components/Input";
import { Link, router } from "expo-router";
import { Mail, UserRound, LockKeyhole } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";

const SignUp = () => {

  const inputprops = {
    placeholder: 'Enter text',
    maxLength: 20,
    style: { color: 'red' }
  }

  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <CustomText styles={"text-primary-default text-4xl font-poppinsBold"}>
        Register
      </CustomText>
      <View className="mt-4">
        <CustomText styles={"text-lg font-poppins"}>
          Create an{" "}
          <CustomText styles="text-xl text-primary-default font-poppinsSemiBold">
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
          {...inputprops}
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
          styles="backgroundColor: 'red'"
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
      <TouchableOpacity className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
      onPress={() => {
        router.push("/create-account");
      }}>
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
      <View className="flex-1">
        <CustomText styles={"text-l mt-4 text-center"}>
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
