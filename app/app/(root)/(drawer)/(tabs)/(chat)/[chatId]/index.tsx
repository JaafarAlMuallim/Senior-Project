import CustomText from "@/components/CustomText";
import { toast } from "@/components/ui/toast";
import {
  useLiveMessages,
  useThrottledIsTypingMutation,
  useWhoIsTyping,
} from "@/hooks/useChats";
import { trpc } from "@/lib/trpc";
import {
  useDocumentUploader,
  useImageUploader,
  useUploadThing,
} from "@/lib/uploadthing";
import { separateNameNum } from "@/lib/utils";
import { useUserStore } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
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

  const { user } = useUserStore();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const utils = trpc.useUtils();

  const isTypingMutation = useThrottledIsTypingMutation(chatId!, user?.user.id);

  const liveMessages = useLiveMessages(chatId!);

  const { openDocumentPicker, isUploading: fileUploading } =
    useDocumentUploader("pdf", {
      onClientUploadComplete: () => Alert.alert("Upload Completed"),
      onUploadError: (error) => Alert.alert("Upload Error", error.message),
    });
  const { openImagePicker, isUploading: imageUploading } = useImageUploader(
    "image",
    {
      onClientUploadComplete: () => Alert.alert("Upload Completed"),
      onUploadError: (error) => Alert.alert("Upload Error", error.message),
    },
  );

  const { startUpload, isUploading: audioUploading } = useUploadThing("audio", {
    onUploadBegin: () => {
      toast({
        title: "Uploading",
        description: "Audio is being uploaded",
        variant: "info",
        ms: 3000,
      });
    },
    onClientUploadComplete: (data) => {
      toast({
        title: "Success",
        description: "Audio uploaded successfully",
        variant: "success",
        ms: 3000,
      });
    },
    onUploadError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
        ms: 3000,
      });
    },
  });

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
  console.log("WHO IS TYPING: ", whoIsTyping);
  console.log("WHO IS TYPING: ", chatId);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async (save: boolean) => {
    if (!recording) return;

    setIsRecording(false);

    try {
      await recording.stopAndUnloadAsync();
      if (save) {
        const { sound, status } = await recording!.createNewLoadedSoundAsync();
        const uri = recording.getURI();
        const x = {
          sound,
          duration: recordingDuration,
          file: uri,
        };
        if (uri) {
          console.log(uri);
          const response = await fetch(uri);
          if (!response.ok) {
            console.error("Failed to fetch recording");
            return;
          }
          console.log("RESPONSE OK");
          const blob = await response.blob();
          if (blob.size === 0) {
            // Save the sound as a file instead
            const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
            startUpload([file]);
          } else {
            const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
            startUpload([file]);
          }
          setRecordingDuration(0);
        }
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }

    setRecording(null);
  };

  const messages = useMemo(() => {
    if (!liveMessages || !liveMessages.messages) return [];
    return liveMessages.messages.map((message) => ({
      _id: message.id,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.userId,
        name: message.user.name,
      },
      // audio: message.audioUrl,
    }));
  }, [liveMessages]);

  const renderComposer = (props: ComposerProps) => {
    return (
      <View className="flex-row flex-1 bg-white-default rounded-xl px-2 border border-gray-400 text-lg justify-center items-center">
        {isRecording ? (
          <View className="flex-row items-center justify-between px-2 bg-white-default flex-1 rounded-[20px] py-2 text-lg">
            <View className="flex-row items-center">
              <Ionicons name="radio" size={24} color="red" />
              <CustomText styles="ml-2">
                {recordingDuration.toFixed(0)}s
              </CustomText>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => stopRecording(true)}
                className="mr-1"
              >
                <Ionicons name="send" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => stopRecording(false)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
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
                  fontSize: 16,
                },
                placeholder: "Type a message...",
                value: text,
                onChangeText: setText,
                autoFocus: false,
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
              }}
            />
            <TouchableOpacity
              onPress={async () =>
                openImagePicker({
                  source: "camera",
                })
              }
            >
              <Ionicons name="camera" size={24} color="#007AFF" />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  const renderSend = (props: SendProps<IMessage>) => {
    return isFocused ? (
      <TouchableWithoutFeedback
        onPress={() => {
          mutate({
            groupId: chatId!,
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
      <TouchableWithoutFeedback onPress={startRecording}>
        <Send {...props}>
          <View>
            <Ionicons
              name="mic"
              size={24}
              color={isRecording ? "red" : "#007AFF"}
            />
          </View>
        </Send>
      </TouchableWithoutFeedback>
    );
  };
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
        "Choose From Library": async () => {
          await openImagePicker({
            source: "library",
          });
        },

        "Choose From Files": async () => {
          await openDocumentPicker({});
        },
        Cancel: () => {
          console.log("Cancel");
        },
      }}
      optionTintColor="#222B45"
    />
  );

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
        renderBubble={renderBubble}
        renderTime={renderTime}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
      />
    </>
  );
};

export default Chat;
