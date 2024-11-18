import { separateNameNum } from "@/lib/utils";
import { useOfflineStore } from "@/store/offlineStorage";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useAudioRecording } from "./useAudioRecording";
import { useMessageHandling } from "./useMessageHandling";
import { useTypingStatus } from "./useTypingStatus";
import { useUploaders } from "./useUploaders";

export const useChatConfig = () => {
  const { chatId, name } = useLocalSearchParams<{ chatId?: string; name?: string }>();
  const { user } = useOfflineStore();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const audioRecording = useAudioRecording();
  const whoIsTyping = useTypingStatus(chatId!, user?.user.id!, text, isFocused);
  const { messages, mutate, liveMessages } = useMessageHandling(chatId!);
  const uploaders = useUploaders();

  const isValid = Boolean(chatId && name);

  return {
    chatConfig: {
      isValid,
      title: separateNameNum(name?.toString() || ""),
      onBack: () => router.back(),
      giftedChatProps: {
        infiniteScroll: true,
        listViewProps: {
          scrollEventThrottle: 400,
          onScroll: () => {
            if (liveMessages.query.hasNextPage || liveMessages.query.isFetchingNextPage) return;
            liveMessages.query.fetchNextPage();
          },
        },
        renderUsernameOnMessage: true,
        alwaysShowSend: true,
        isTyping: whoIsTyping.length > 0 && !whoIsTyping.includes(user?.user.name),
      },
    },
    messages,
    user: {
      _id: user?.user.id,
      name: user?.user.name,
    },
    handlers: {
      setText,
      setIsFocused,
      mutate,
      ...audioRecording,
    },
    state: {
      text,
      isFocused,
      chatId,
      ...audioRecording,
    },
    uploaders,
  };
}; 