import { useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useWhoIsTyping } from "@/hooks/useChats";
import { trpc } from "@/lib/trpc";
import { cn, listWithAnd, pluralize } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import CustomText from "./CustomText";
import { useOfflineStore } from "@/store/offlineStorage";
import { BellOff, VolumeOff } from "lucide-react-native";

interface ChatProps {
  imageUri: string;
  groupId: string;
  groupName: string;
  routeTo: string;
  styles?: string;
  isMuted: boolean;
}

export default function Chat({
  imageUri,
  groupId,
  groupName,
  styles,
  routeTo,
  isMuted,
  ...touchableProps
}: ChatProps) {
  const { lastMessage: offlineLastMsg, setLastMessage } = useOfflineStore();
  const [content, setContent] = useState(offlineLastMsg[groupId]?.text || "");
  const currentlyTyping = useWhoIsTyping(groupId);

  const { data: lastMessage, isLoading } =
    trpc.messages.getLastMessage.useQuery(
      { groupId },
      {
        refetchInterval: 20000,
      },
    );
  console.log("LAST MESSAGE: ", lastMessage);

  const { data: unreadCount } = trpc.messages.getUnreadCount.useQuery(
    { groupId },
    {
      refetchInterval: 20000,
    },
  );

  useEffect(() => {
    if (lastMessage) {
      setLastMessage(groupId, lastMessage);
    }
  }, [lastMessage, groupId, setLastMessage]);

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
    } else if (lastMessage?.text) {
      const trimmedText = lastMessage.text.substring(0, 30).trim();
      setContent(
        `${trimmedText}${lastMessage.text.length > 30 ? "..." : ""}` ||
          "No messages",
      );
    } else {
      setContent("No messages");
    }
  }, [currentlyTyping, lastMessage, isLoading]);

  const time = useMemo(() => {
    if (lastMessage?.createdAt) {
      const date = new Date(lastMessage.createdAt);
      const min = date.getMinutes();
      return `${date.getHours()}:${min < 10 ? `0${min}` : min}`;
    }
    return "";
  }, [lastMessage]);

  return (
    <TouchableOpacity
      className={cn(
        "items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row border-b border-gray-400",
        styles,
      )}
      {...touchableProps}
      delayLongPress={300}
      onPress={() => {
        router.push(routeTo);
      }}
    >
      <View className="flex flex-row w-full">
        <Avatar
          alt={`${groupName} avatar`}
          className="w-14 h-14 rounded-full mr-4 bg-gray-300"
        >
          <AvatarImage source={{ uri: imageUri || "" }} />
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
          <View className="flex justify-center items-center space-y-2">
            <CustomText styles="text-primary-light">
              {time ? time : ""}
            </CustomText>
            {isMuted && <BellOff color={"#C21D1A"} />}
          </View>
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
}
// import { useWhoIsTyping } from "@/hooks/useChats";
// import { trpc } from "@/lib/trpc";
// import { cn, listWithAnd, pluralize } from "@/lib/utils";
// import { router } from "expo-router";
// import React, { useEffect, useMemo, useState } from "react";
// import { TouchableOpacity, View } from "react-native";
// import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
// import CustomText from "./CustomText";
// import { useOfflineStore } from "@/store/offlineStorage";
//
// const Chat = ({
//   imageUri,
//   groupId,
//   groupName,
//   styles,
//   routeTo,
//   ...touchableProps
// }: {
//   imageUri: string;
//   groupId: string;
//   groupName: string;
//   routeTo: string;
//   styles?: string;
// }) => {
//   const { lastMessage: offlineLastMsg, setLastMessage } = useOfflineStore();
//   const [content, setContent] = useState(offlineLastMsg[groupId]?.text || "");
//   console.log("GROUP ID: ", groupId);
//   const currentlyTyping = useWhoIsTyping(groupId);
//   console.log("WHO IS TYPING: ", currentlyTyping);
//   console.log("WHO IS TYPING: ", groupId);
//   const { data: lastMessage, isLoading } =
//     trpc.messages.getLastMessage.useQuery(
//       { groupId },
//       {
//         refetchInterval: 20000,
//       },
//     );
//
//   useEffect(() => {
//     if (lastMessage) {
//       setLastMessage(groupId, lastMessage);
//     }
//   }, [lastMessage]);
//
//   const { data: unreadCount } = trpc.messages.getUnreadCount.useQuery(
//     {
//       groupId,
//     },
//     {
//       refetchInterval: 20000,
//     },
//   );
//
//   useEffect(() => {
//     if (currentlyTyping.length > 0) {
//       setContent(
//         `${listWithAnd(currentlyTyping)} ${pluralize(
//           currentlyTyping.length,
//           "is",
//           "are",
//         )} typing...`,
//       );
//     } else if (isLoading) {
//       setContent("Loading...");
//     } else {
//       setContent(
//         `${lastMessage?.text.substring(0, 30).trim()}${lastMessage!.text.length > 30 ? "..." : ""}` ||
//           "No messages",
//       );
//     }
//   }, [currentlyTyping, lastMessage, isLoading]);
//
//   const time = useMemo(() => {
//     const date = new Date(lastMessage?.createdAt!);
//     const min = date.getMinutes();
//     return `${date.getHours()}:${min < 10 ? `0${min}` : min}`;
//   }, [lastMessage]);
//
//   return (
//     <TouchableOpacity
//       className={cn(
//         `items-start justify-start min-h-16 px-8 py-4 rounded-2xl flex-wrap flex-row border-b border-gray-400`,
//         styles,
//       )}
//       {...touchableProps}
//       delayLongPress={300}
//       onPress={() => {
//         router.push(routeTo);
//       }}
//     >
//       <View className="flex flex-row w-full">
//         <Avatar
//           alt={`${groupName} avatar`}
//           className="w-14 h-14 rounded-full mr-4 bg-gray-300"
//         >
//           <AvatarImage source={{ uri: "" }} />
//           <AvatarFallback>
//             <CustomText>{groupName}</CustomText>
//           </AvatarFallback>
//         </Avatar>
//         <View className="flex flex-column items-start justify-start grow">
//           <CustomText styles="text-primary-light text-xl">
//             {groupName}
//           </CustomText>
//           <CustomText styles="text-gray-light text-lg">{content}</CustomText>
//         </View>
//         <View className="justify-center items-center">
//           <CustomText styles="text-primary-light">{time}</CustomText>
//           {unreadCount && unreadCount > 0 ? (
//             <View className="my-1 bg-primary-light rounded-full w-6 h-6 flex items-center justify-center">
//               <CustomText styles="text-white-default text-sm">
//                 {unreadCount}
//               </CustomText>
//             </View>
//           ) : null}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };
// export default Chat;
