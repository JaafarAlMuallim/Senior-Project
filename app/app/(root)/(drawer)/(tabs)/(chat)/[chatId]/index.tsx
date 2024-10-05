import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps,
  Time,
  TimeProps,
} from "react-native-gifted-chat";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { separateNameNum } from "@/lib/utils";
import { useUserStore } from "@/store/store";
import { useThrottledIsTypingMutation, useWhoIsTyping } from "@/hooks/useChats";

const Chat = () => {
  const { chatId, name } = useLocalSearchParams<{
    chatId?: string;
    name?: string;
  }>();

  const { user } = useUserStore();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfXbh7mlikddoExnyLEsogtMhm-HpzamcCHSqMHJ_8uitlV0PviwsS3AEMMvsWR2sXo5w&usqp=CAU",
      },
    },
  ]);

  const isTypingMutation = useThrottledIsTypingMutation(chatId!, user?.user.id);

  const whoIsTyping = useWhoIsTyping(chatId!);

  useEffect(() => {
    if (isFocused && text.length > 0) {
      isTypingMutation(true);
    } else {
      isTypingMutation(false);
    }
  }, [isFocused, text, isTypingMutation]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#002EB8", // Background color for received messages
          },
          right: {
            backgroundColor: "#4561FF", // Background color for sent messages
          },
        }}
        textStyle={{
          left: {
            color: "#fff", // Text color for received messages
          },
          right: {
            color: "#fff", // Text color for sent messages
          },
        }}
      />
    );
  };

  const renderTime = (props: TimeProps<IMessage>) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: "#fff", // Custom color for the time on received messages
          },
          right: {
            color: "#fff", // Custom color for the time on sent messages
          },
        }}
      />
    );
  };

  // Custom InputToolbar
  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 1,
          borderTopColor: "#e8e8e8",
          padding: 8,
          backgroundColor: "#f5f5f5", // Background color of the toolbar
        }}
      />
    );
  };

  // Custom Composer
  const renderComposer = (props: ComposerProps) => {
    // return <Composer {...props} text={text} />;

    return (
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginRight: 8,
          borderWidth: 1,
          borderColor: "#ddd", // Border color of the input field
          fontSize: 16, // Text size in the input field
        }}
        {...props}
        placeholder="Type a message..."
        placeholderTextColor="#666"
        value={text}
        onChangeText={setText}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
    );
  };

  // Custom Send button
  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </View>
      </Send>
    );
  };

  // if (isLoading) {
  //   return (
  //     <View className="h-full flex flex-col p-8 bg-white-default">
  //       <SignedIn>
  //         <Animated.View
  //           style={{
  //             transform: [{ rotate }],
  //           }}
  //           className="flex-1 items-center justify-center"
  //         >
  //           <Loader2 className="h-48 w-48" size={96} />
  //         </Animated.View>
  //       </SignedIn>
  //       <SignedOut>
  //         <Redirect href={"/(auth)/welcome"} />
  //       </SignedOut>
  //     </View>
  //   );
  // }

  if (!chatId || !name) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(chat)" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: separateNameNum(name?.toString() || ""),
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />
      <GiftedChat
        renderUsernameOnMessage={true}
        messages={messages}
        alwaysShowSend={true}
        isTyping={whoIsTyping.length > 0}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.id,
          name: user?.user.name,
        }}
        renderBubble={renderBubble} // Use the custom bubble renderer
        renderTime={renderTime} // Use custom time renderer
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        //   renderMessage={(props) => <CustomMessage {...props} />}
      />
    </>
  );
};
export default Chat;
