import { useThrottledIsTypingMutation, useWhoIsTyping } from '@/hooks/useChats';
import { useEffect } from 'react';

export const useTypingStatus = (chatId: string, userId: string, text: string, isFocused: boolean) => {
  const isTypingMutation = useThrottledIsTypingMutation(chatId, userId);
  const whoIsTyping = useWhoIsTyping(chatId);

  useEffect(() => {
    let typingTimeout: ReturnType<typeof setTimeout> | null = null;

    if (isFocused && text !== "") {
      if (typingTimeout) clearTimeout(typingTimeout);
      isTypingMutation(true);

      typingTimeout = setTimeout(() => {
        isTypingMutation(false);
      }, 2000);
    } else {
      isTypingMutation(false);
    }

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [isFocused, text, isTypingMutation]);

  return whoIsTyping;
}; 