import CustomText from "@/components/CustomText";
import { CloudUpload } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";

const RequestsModalPage = () => {
  return (
    <View className="h-full bg-white-default justify-start items-center py-8 gap-4">
      <View className="w-96 flex flex-col p-4 border border-secondary-lightGray shadow bg-white-default rounded-lg">
        <CustomText styles="text-xl">Request From User</CustomText>
        <CustomText styles="mt-2 text-md">
          User requested a tutoring session 17-10-2021 at 12:00 PM.
        </CustomText>
        <View className="flex flex-row justify-between items-center w-full">
          <CustomText styles="mt-2 text-secondary-gray">1 Day Ago</CustomText>
          <View className="flex flex-row gap-2 my-2">
            <TouchableOpacity
              onPress={() => {}}
              className="flex flex-col justify-center items-center bg-danger-default p-2 rounded-lg"
            >
              <CustomText styles="text-toast-error">Decline</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              className="flex flex-col justify-center items-center bg-success-default p-2 rounded-lg"
            >
              <CustomText styles="text-toast-success">Accept</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="w-96 flex flex-col p-4 border border-secondary-lightGray shadow bg-white-default rounded-lg">
        <CustomText styles="text-xl">Request From User</CustomText>
        <CustomText styles="mt-2 text-md">
          User requested a tutoring session 17-10-2021 at 12:00 PM.
        </CustomText>
        <View className="flex flex-row justify-between items-center w-full">
          <CustomText styles="mt-2 text-secondary-gray">1 Day Ago</CustomText>
          <View className="flex flex-row gap-2 my-2">
            <TouchableOpacity
              onPress={() => {}}
              className="flex flex-col justify-center items-center bg-danger-default p-2 rounded-lg"
            >
              <CustomText styles="text-toast-error">Decline</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              className="flex flex-col justify-center items-center bg-success-default p-2 rounded-lg"
            >
              <CustomText styles="text-toast-success">Accept</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RequestsModalPage;
