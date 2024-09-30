import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
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

const Chat = () => {
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
  const { chatId } = useLocalSearchParams<{ chatId?: string }>();

  if (!chatId) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(chat)" />;
  }

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
    return (
      <Composer
        {...props}
        textInputStyle={{
          backgroundColor: "#fff",
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginRight: 8,
          borderWidth: 1,
          borderColor: "#ddd", // Border color of the input field
          fontSize: 16, // Text size in the input field
        }}
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

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: chatId,
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "Poppins-Bold",
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
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
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
