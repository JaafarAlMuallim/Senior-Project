import React, { ReactNode } from "react";
import { View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import CustomText from "./CustomText";

const ProfileOption = ({ label, icon }: { label: string; icon: ReactNode }) => {
  return (
    <View className="w-full flex-row items-center mt-4">
      <View className="flex-none">{icon}</View>
      <CustomText styles="flex-1 text-lg w-64 ml-2">{label}</CustomText>
      <View className="">
        <ChevronRight className="w-10 h-10" />
      </View>
    </View>
  );
};

export default ProfileOption;
