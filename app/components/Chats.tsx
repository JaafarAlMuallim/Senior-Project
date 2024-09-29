import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";

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
      className={`items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-blue-def50 border-b border-gray-400 ${styles}`}
      {...touchableProps}
      onPress={() => {
        router.push(routeTo);
      }}
    >
      <View className="flex flex-row items-center justify-between">
        <Image
          source={{
            uri: imageUri,
          }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex flex-column items-start justify-start mr-44 ml-5">
          <Text className="text-blue-600 text-base">{groupName}</Text>
          <Text className="text-gray-700 text-sm">{recentMessage}</Text>
        </View>
        <Text className="text-blue-600">{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
