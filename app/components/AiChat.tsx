import { router } from "expo-router";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { trpc } from "@/lib/trpc";
import { useOfflineStore } from "@/store/offlineStorage";

const AiChat = ({
  chatName,
  groupId,
  styles,
  routeTo,
  ...touchableProps
}: {
  chatName: string;
  groupId: string;
  routeTo: string;
  styles?: string;
}) => {
  const { lastMessage: offlineLastMsg, setLastMessage } = useOfflineStore();
  const { data: lastMessage, isLoading } =
    trpc.messages.getLastMessage.useQuery(
      { groupId },
      {
        refetchInterval: 2000,
      },
    );

  useEffect(() => {
    if (lastMessage) {
      setLastMessage(groupId, lastMessage);
    }
  }, [lastMessage]);

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
          {offlineLastMsg[groupId]
            ? `${offlineLastMsg[groupId]?.text.substring(0, 30).trim()}${lastMessage!.text.length > 30 ? "..." : ""}`
            : isLoading
              ? "Loading..."
              : `${lastMessage?.text.substring(0, 30).trim()}${lastMessage!.text.length > 30 ? "..." : ""}` ||
                "No messages"}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default AiChat;
