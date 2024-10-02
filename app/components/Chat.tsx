import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import CustomText from "./CustomText";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { cn } from "@/lib/utils";

const Chat = ({
  imageUri,
  groupName,
  recentMessage,
  time,
  styles,
  routeTo,
  ...touchableProps // Spread TouchableOpacity props
}: {
  imageUri: string;
  groupName: string;
  recentMessage: string;
  time: string;
  routeTo: string;
  styles?: string;
}) => {
  return (
    <TouchableOpacity
      className={cn(
        `items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row border-b border-gray-400`,
        styles,
      )}
      {...touchableProps}
      onPress={() => {
        router.push(routeTo);
      }}
    >
      <View className="flex flex-row w-full">
        <Avatar
          alt="Zach Nugent's Avatar"
          className="w-14 h-14 rounded-full mr-4 bg-gray-300"
        >
          <AvatarImage source={{ uri: "" }} />
          <AvatarFallback>
            <CustomText>{groupName}</CustomText>
          </AvatarFallback>
        </Avatar>
        <View className="flex flex-column items-start justify-start grow">
          <CustomText styles="text-primary-light text-xl">
            {groupName}
          </CustomText>
          <CustomText styles="text-gray-light text-lg">
            {recentMessage}
          </CustomText>
        </View>
        <CustomText styles="text-primary-light">{time}</CustomText>
      </View>
    </TouchableOpacity>
  );
};
export default Chat;
