import { useLiveMessages } from '@/hooks/useChats';
import { trpc } from '@/lib/trpc';
import { useMemo } from 'react';

export const useMessageHandling = (chatId: string) => {
  const utils = trpc.useUtils();
  const liveMessages = useLiveMessages(chatId);

  const { mutate } = trpc.messages.add.useMutation({
    onError: (err) => {
      console.error("ERROR: ", err);
      console.log("Message not sent");
    },
    onSuccess: () => {
      console.log("Message sent");
      utils.messages.getMessages.invalidate({ groupId: chatId });
      utils.messages.getLastMessage.invalidate({ groupId: chatId });
      utils.messages.infinite.invalidate({ groupId: chatId });
    },
  });

  const formattedMessages = useMemo(() => {
    if (!liveMessages || !liveMessages.messages) return [];
    return liveMessages.messages.map((message) => ({
      _id: message.id,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.userId,
        name: message.user.name,
      },
    }));
  }, [liveMessages]);

  return {
    messages: formattedMessages,
    mutate,
    liveMessages,
  };
}; 