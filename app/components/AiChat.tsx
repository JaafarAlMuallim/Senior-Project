import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useOfflineStore } from "@/store/offlineStorage";
import CustomText from "@/components/CustomText";

export default function AiChat({
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
}) {
  const router = useRouter();
  const { lastMessage: offlineLastMsg, setLastMessage } = useOfflineStore();
  const [content, setContent] = useState(offlineLastMsg[groupId]?.text || "");
  console.log(groupId);
  const { data: lastMessage, isLoading } =
    trpc.messages.getLastMessage.useQuery(
      { groupId },
      {
        refetchInterval: 2000,
      },
    );

  useEffect(() => {
    if (isLoading) {
      setContent("Loading...");
    } else if (lastMessage && lastMessage.text) {
      const trimmedText = lastMessage.text.substring(0, 30).trim();
      setContent(
        `${trimmedText}${lastMessage.text.length > 30 ? "..." : ""}` ||
          "No messages",
      );
      setLastMessage(groupId, lastMessage);
    } else {
      setContent("No messages");
    }
  }, [lastMessage, isLoading, groupId, setLastMessage]);

  return (
    <TouchableOpacity
      className={`items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row border-b border-gray-400 ${styles || ""}`}
      {...touchableProps}
      onPress={() => {
        router.push(routeTo);
      }}
    >
      <View className="flex flex-column items-start justify-start">
        <CustomText styles="text-primary-light text-2xl">{chatName}</CustomText>
        <CustomText styles="text-gray-light text-lg">{content}</CustomText>
      </View>
    </TouchableOpacity>
  );
}
// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { TouchableOpacity, View } from "react-native";
// import CustomText from "./CustomText";
// import { trpc } from "@/lib/trpc";
// import { useOfflineStore } from "@/store/offlineStorage";
//
// const AiChat = ({
//   chatName,
//   groupId,
//   styles,
//   routeTo,
//   ...touchableProps
// }: {
//   chatName: string;
//   groupId: string;
//   routeTo: string;
//   styles?: string;
// }) => {
//   const { lastMessage: offlineLastMsg, setLastMessage } = useOfflineStore();
//   const [content, setContent] = useState(offlineLastMsg[groupId]?.text || "");
//   const { data: lastMessage, isLoading } =
//     trpc.messages.getLastMessage.useQuery(
//       { groupId },
//       {
//         refetchInterval: 2000,
//       },
//     );
//
//   useEffect(() => {
//     if (isLoading) {
//       setContent("Loading...");
//     } else {
//       setContent(
//         `${lastMessage?.text.substring(0, 30).trim()}${lastMessage!.text.length > 30 ? "..." : ""}` ||
//           "No messages",
//       );
//       if (lastMessage) {
//         setLastMessage(groupId, lastMessage!);
//       }
//     }
//   }, [lastMessage, isLoading]);
//
//   return (
//     <TouchableOpacity
//       className={`items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row border-b border-gray-400 ${styles}`}
//       {...touchableProps}
//       onPress={() => {
//         router.push(routeTo);
//       }}
//     >
//       <View className="flex flex-column items-start justify-start">
//         <CustomText styles="text-primary-light text-2xl">{chatName}</CustomText>
//         <CustomText styles="text-gray-light text-lg">{content}</CustomText>
//       </View>
//     </TouchableOpacity>
//   );
// };
//
// export default AiChat;
