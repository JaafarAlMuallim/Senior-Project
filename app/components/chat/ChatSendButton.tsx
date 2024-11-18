import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IMessage, Send, SendProps } from "react-native-gifted-chat";

interface ChatSendButtonProps extends SendProps<IMessage> {
  isFocused: boolean;
  isRecording: boolean;
  text: string;
  chatId: string;
  mutate: (data: { groupId: string; text: string }) => void;
  startRecording: () => void;
}

export const ChatSendButton = ({
  isFocused,
  isRecording,
  text,
  chatId,
  mutate,
  startRecording,
  ...props
}: ChatSendButtonProps) => {
  return isFocused ? (
    <TouchableWithoutFeedback
      onPress={() => {
        mutate({
          groupId: chatId,
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