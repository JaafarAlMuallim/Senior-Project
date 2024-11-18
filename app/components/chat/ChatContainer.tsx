import { GiftedChat } from "react-native-gifted-chat";
import { ChatComponents } from "./ChatComponents";
import { ChatHeader } from "./ChatHeader";

export const ChatContainer = () => {
  const {
    chatConfig,
    messages,
    user,
    handlers,
    state,
    uploaders,
  } = useChatConfig();

  if (!chatConfig.isValid) {
    return <ChatRedirect />;
  }

  return (
    <>
      <ChatHeader 
        title={chatConfig.title} 
        onBack={chatConfig.onBack} 
      />
      <GiftedChat
        {...chatConfig.giftedChatProps}
        messages={messages}
        user={user}
        {...ChatComponents({
          handlers,
          state,
          uploaders,
        })}
      />
    </>
  );
}; 