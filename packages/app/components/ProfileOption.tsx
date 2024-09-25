import React, { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import CustomText from "./CustomText";
import { router } from "expo-router";

const ProfileOption = ({
  label,
  icon,
  params,
  link,
}: {
  label: string;
  icon: ReactNode;
  params?: any;
  link: string;
}) => {
  return (
    <TouchableOpacity
      className="w-full"
      onPress={() => {
        link && router.push({ pathname: link, params });
      }}
    >
      <View className="w-full flex-row items-center mt-4">
        <View className="flex-none">{icon}</View>
        <CustomText styles="flex-1 text-lg w-64 ml-2">{label}</CustomText>
        <View className="">
          <ChevronRight className="w-10 h-10" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOption;
