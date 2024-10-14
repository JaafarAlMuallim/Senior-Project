import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Actions,
  ActionsProps,
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
import {
  Redirect,
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { separateNameNum } from "@/lib/utils";
import { useUserStore } from "@/store/store";
import {
  useLiveMessages,
  useThrottledIsTypingMutation,
  useWhoIsTyping,
} from "@/hooks/useChats";
import { trpc } from "@/lib/trpc";
import CustomText from "@/components/CustomText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Chat = () => {
  const { chatId, name } = useLocalSearchParams<{
    chatId?: string;
    name?: string;
  }>();

  const { user } = useUserStore();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const utils = trpc.useUtils();

  const isTypingMutation = useThrottledIsTypingMutation(chatId!, user?.user.id);

  const liveMessages = useLiveMessages(chatId!);

  const messages = useMemo(() => {
    if (!liveMessages || !liveMessages.messages) return [];
    return liveMessages.messages.map((message) => ({
      _id: message.id,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.userId,
        name: message.user.name,
        // name: message.user,
      },
    }));
  }, [liveMessages]);

  const { mutate: subscribe } = trpc.groups.sub.useMutation({
    onSuccess: () => {
      console.log("Subscribed");
    },

    onError: (err) => {
      console.error("ERROR: ", err);
    },
    gcTime: 1000 * 60 * 60 * 24,
  });

  const { mutate: unsubscribe } = trpc.groups.unsub.useMutation({
    onSuccess: () => {
      console.log("Unsubscribed");
    },

    onError: (err) => {
      console.error("ERROR: ", err);
    },
    gcTime: 1000 * 60 * 60 * 24,
  });

  useFocusEffect(
    useCallback(() => {
      subscribe({ groupId: chatId!, userId: user?.user.id! });

      return () => {
        unsubscribe({ groupId: chatId!, userId: user?.user.id! });
      };
    }, []),
  );

  const { mutate } = trpc.messages.add.useMutation({
    onError: (err) => {
      console.error("ERROR: ", err);
      console.log("Message not sent");
    },
    onSuccess: () => {
      console.log("Message sent");
      utils.messages.getMessages.invalidate({ groupId: chatId! });
      utils.messages.getLastMessage.invalidate({ groupId: chatId! });
      utils.messages.infinite.invalidate({ groupId: chatId! });
      setText("");
    },
  });

  const whoIsTyping = useWhoIsTyping(chatId!);

  useEffect(() => {
    let typingTimeout: ReturnType<typeof setTimeout> | null = null;

    if (isFocused && text !== "") {
      // User is typing, debounce the typing state change
      if (typingTimeout) clearTimeout(typingTimeout);

      isTypingMutation(true); // Start typing immediately

      // Set a timeout to stop typing after 2 seconds of no input
      typingTimeout = setTimeout(() => {
        isTypingMutation(false); // Stop typing if no input for 2 seconds
      }, 2000); // Adjust the timeout duration as needed
    } else {
      isTypingMutation(false); // Stop typing when the input is cleared or focus is lost
    }

    // Cleanup function to clear the timeout if component unmounts or re-renders
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [isFocused, text, isTypingMutation]);

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
            fontFamily: "PoppinsRegular",
          },
          right: {
            color: "#fff", // Text color for sent messages
            fontFamily: "PoppinsRegular",
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

  const renderActions = (props: ActionsProps) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
        marginRight: 4,
        marginBottom: -4,
      }}
      icon={() => <Ionicons name="attach" size={24} color="#007AFF" />}
      options={{
        "Choose From Library": () => {
          console.log("Choose From Library");
        },
        Cancel: () => {
          console.log("Cancel");
        },
      }}
      optionTintColor="#222B45"
    />
  );

  // Custom Composer
  const renderComposer = (props: ComposerProps) => {
    return (
      <View className="flex-row flex-1 bg-white-default rounded-xl px-2 border border-gray-400 text-lg justify-center items-center">
        <Composer
          {...props}
          text={text}
          textInputProps={{
            style: {
              backgroundColor: "#fff",
              flex: 1,
              borderRadius: 20,
              paddingHorizontal: 4,
              paddingVertical: 8,
              marginRight: 8,
              // borderWidth: 1,
              // borderColor: "#ddd", // Border color of the input field
              fontSize: 16, // Text size in the input field
            },
            placeholder: "Type a message...",
            value: text,
            onChangeText: setText,
            autoFocus: false,
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
          }}
        />
        <TouchableOpacity>
          <Ionicons name="camera" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    );

    return (
      <TextInput
        // style={{
        //   backgroundColor: "#fff",
        //   borderRadius: 20,
        //   paddingHorizontal: 12,
        //   paddingVertical: 8,
        //   marginRight: 8,
        //   borderWidth: 1,
        //   borderColor: "#ddd", // Border color of the input field
        //   fontSize: 16, // Text size in the input field
        // }}
        className="flex-1 bg-white-default rounded-2xl px-4 border border-gray-400 text-lg justify-center items-center"
        {...props}
        placeholder="Type a message..."
        value={text}
        onChangeText={setText}
        autoFocus={false}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
    );
  };

  // Custom Send button
  const renderSend = (props: SendProps<IMessage>) => {
    return isFocused ? (
      <TouchableWithoutFeedback
        onPress={() => {
          mutate({
            groupId: chatId!,
            userId: user?.user.id!,
            text: text,
          });
        }}
      >
        <Send {...props}>
          <View>
            <Ionicons name="send" size={24} color="#007AFF" />
          </View>
        </Send>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback
        onPress={() => {
          mutate({
            groupId: chatId!,
            userId: user?.user.id!,
            text: text,
          });
        }}
      >
        <Send {...props}>
          <View>
            <Ionicons name="mic" size={24} color="#007AFF" />
          </View>
        </Send>
      </TouchableWithoutFeedback>
    );
  };

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
        infiniteScroll={true}
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: () => {
            if (
              liveMessages.query.hasNextPage ||
              liveMessages.query.isFetchingNextPage
            )
              return;
            liveMessages.query.fetchNextPage();
          },
        }}
        renderUsernameOnMessage={true}
        renderActions={renderActions}
        messages={messages}
        alwaysShowSend={true}
        isTyping={
          whoIsTyping.length > 0 && !whoIsTyping.includes(user?.user.name)
        }
        user={{
          _id: user?.user.id,
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
