import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";

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
      className={`items-center justify-center mt-2 min-h-16 p-3 rounded-2xl flex-wrap flex-row border-b border-gray-400 ${styles}`}
      {...touchableProps}
      onPress={() => {
        router.push(routeTo);
      }}
    >
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-column items-start justify-start mr-44">
          <Text className="text-blue-600 text-lg">{chatName}</Text>
          <Text className="text-grag-700 text-base">{recentMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AiChat;
