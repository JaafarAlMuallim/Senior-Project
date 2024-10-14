import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { cn, listWithAnd, pluralize } from "@/lib/utils";
import { useWhoIsTyping } from "@/hooks/useChats";
import { trpc } from "@/lib/trpc";
import { useUserStore } from "@/store/store";

const Chat = ({
  imageUri,
  groupId,
  groupName,
  styles,
  routeTo,
  ...touchableProps // Spread TouchableOpacity props
}: {
  imageUri: string;
  groupId: string;
  groupName: string;
  routeTo: string;
  styles?: string;
}) => {
  const { user } = useUserStore();
  const [content, setContent] = useState("");
  const currentlyTyping = useWhoIsTyping(groupId);
  const { data: lastMessage, isLoading } =
    trpc.messages.getLastMessage.useQuery(
      { groupId },
      {
        refetchInterval: 2000,
      },
    );

  const { data: unreadCount } = trpc.messages.getUnreadCount.useQuery(
    {
      groupId,
      userId: user.user.id,
    },
    {
      refetchInterval: 2000,
    },
  );

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
      setContent(lastMessage?.text || "No messages");
    }
  }, [currentlyTyping, lastMessage, isLoading]);

  const time = useMemo(() => {
    const date = new Date(lastMessage?.createdAt!);
    return `${date.getHours()}:${date.getMinutes()}`;
  }, [lastMessage]);

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
        <View className="justify-center items-center">
          <CustomText styles="text-primary-light">{time}</CustomText>
          {unreadCount && unreadCount > 0 ? (
            <View className="my-1 bg-primary-light rounded-full w-6 h-6 flex items-center justify-center">
              <CustomText styles="text-white-default text-sm">
                {unreadCount}
              </CustomText>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Chat;
