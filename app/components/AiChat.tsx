import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import CustomText from "./CustomText";

const AiChat = ({
  chatName,
  recentMessage,
  styles,
  routeTo,
  ...touchableProps
}: {
  chatName: string;
  recentMessage: string;
  routeTo: string;
  styles?: string;
}) => {
  return (
    <TouchableOpacity
      className={`items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row border-b border-gray-400 ${styles}`}
      {...touchableProps}
      onPress={() => {
        router.push(routeTo);
      }}
    >
      <View className="flex flex-column items-start justify-start">
        <CustomText styles="text-primary-light text-2xl">{chatName}</CustomText>
        <CustomText styles="text-gray-light text-lg">
          {recentMessage}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default AiChat;
