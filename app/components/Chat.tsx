import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { cn, listWithAnd, pluralize } from "@/lib/utils";
import { useWhoIsTyping } from "@/hooks/useChats";
import { trpc } from "@/lib/trpc";

const Chat = ({
  imageUri,
  groupId,
  groupName,
  time,
  styles,
  routeTo,
  ...touchableProps // Spread TouchableOpacity props
}: {
  imageUri: string;
  groupId: string;
  groupName: string;
  time: string;
  routeTo: string;
  styles?: string;
}) => {
  const [content, setContent] = useState("");
  const currentlyTyping = useWhoIsTyping(groupId);
  console.log("GROUP ID: ", groupId);
  console.log("Platform: ", Platform.OS);
  const { data: lastMessage, isLoading } =
    trpc.messages.getLastMessage.useQuery({ groupId });
  useEffect(() => {
    if (currentlyTyping.length > 0) {
      setContent(
        `${listWithAnd(currentlyTyping)} ${pluralize(
          currentlyTyping.length,
          "is",
          "are",
        )} typing...`,
      );
    } else if (isLoading) {
      setContent("Loading...");
    } else {
      setContent(lastMessage?.content || "No messages");
    }
  }, [currentlyTyping, lastMessage, isLoading]);

  console.log("CONTENT: ", content);

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
          <CustomText styles="text-gray-light text-lg">{content}</CustomText>
        </View>
        <CustomText styles="text-primary-light">{time}</CustomText>
      </View>
    </TouchableOpacity>
  );
};
export default Chat;
