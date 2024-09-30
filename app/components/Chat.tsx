import { cn } from "@/lib/utils";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import CustomText from "./CustomText";

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
      className={`items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row border-b border-gray-400 ${styles}`}
      {...touchableProps}
      onPress={() => {
        router.push(routeTo);
      }}
    >
      <View className="flex flex-row w-full">
        <Image
          source={{
            uri: imageUri,
          }}
          className="w-14 h-14 rounded-full mr-4"
        />
        <View className="flex flex-column items-start justify-start grow">
          <CustomText styles="text-primary-light text-2xl">
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

// <TouchableOpacity
//   className={cn(
//     `items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row`,
//     styles,
//   )}
//   {...touchableProps}
//   onPress={() => {
//     router.push(routeTo);
//   }}
// >
//   <View className="flex flex-row items-center justify-between">
//     <Image
//       source={{
//         uri: imageUri,
//       }}
//       className="w-14 h-14 rounded-full"
//     />
//     <View className="flex flex-column items-start justify-start mr-44 ml-5">
//       <CustomText styles="text-primary-light text-lg">
//       </CustomText>
//       <CustomText styles="text-gray-light text-md">
//         {recentMessage}
//       </CustomText>
//     </View>
//   </View>
// </TouchableOpacity>
