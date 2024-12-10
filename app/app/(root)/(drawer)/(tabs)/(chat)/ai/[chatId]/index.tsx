import { trpc } from "@/lib/trpc";
import { separateNameNum } from "@/lib/utils";
import { useOfflineStore } from "@/store/offlineStorage";
import { Ionicons } from "@expo/vector-icons";
import {
  Redirect,
  router,
  Stack,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
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

const Chat = () => {
  const { chatId, name } = useLocalSearchParams<{
    chatId?: string;
    name?: string;
  }>();

  const { user } = useOfflineStore();
  const pathname = usePathname();
  const [text, setText] = useState("");
  const utils = trpc.useUtils();
  console.log(chatId);
  const { data } = trpc.messages.getMessages.useQuery({
    groupId: chatId!,
  });

  const messages = useMemo(() => {
    return data?.map((message) => {
      return {
        _id: message.id,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.userId,
          name: message.user.name,
        },
      };
    });
  }, [data]);

  const { mutate } = trpc.messages.addAIMessage.useMutation({
    onError: (err) => {
      console.error("ERROR: ", err);
      console.log("Message not sent");
    },
    onSuccess: () => {
      console.log("Message sent");
      utils.messages.getMessages.invalidate({ groupId: chatId! });
      utils.messages.getLastMessage.invalidate({ groupId: chatId! });
      setText("");
    },
  });

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
          }}
        />
      </View>
    );
  };

  // Custom Send button
  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          mutate({
            groupId: chatId!,
            text: text,
            agent: separateNameNum(name!),
          });
        }}
      >
        <Send {...props}>
          <View>
            <Ionicons name="send" size={24} color="#007AFF" />
          </View>
        </Send>
      </TouchableWithoutFeedback>
    );
  };

  if ((!chatId || !name) && pathname.includes("chat")) {
    console.log("Redirecting to chats");
    return <Redirect href="/(root)/(drawer)/(tabs)/(chat)/chats" />;
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
        }}
        renderUsernameOnMessage={true}
        renderActions={renderActions}
        renderAvatar={null}
        messages={messages}
        alwaysShowSend={true}
        user={{
          _id: user?.user.id,
          name: user?.user.name,
        }}
        renderBubble={renderBubble} // Use the custom bubble renderer
        renderTime={renderTime} // Use custom time renderer
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
      />
    </>
  );
};

export default Chat;
