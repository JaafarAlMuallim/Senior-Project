import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Composer, ComposerProps } from "react-native-gifted-chat";

interface ChatInputProps extends ComposerProps {
  text: string;
  setText: (text: string) => void;
  isRecording: boolean;
  recordingDuration: number;
  stopRecording: (save: boolean) => void;
  openImagePicker: (options: { source: 'camera' | 'library' }) => void;
  setIsFocused: (focused: boolean) => void;
}

export const ChatInput = ({
  text,
  setText,
  isRecording,
  recordingDuration,
  stopRecording,
  openImagePicker,
  setIsFocused,
  ...props
}: ChatInputProps) => {
  return (
    <View className="flex-row flex-1 bg-white-default rounded-xl px-2 border border-gray-400 text-lg justify-center items-center">
      {isRecording ? (
        <RecordingView 
          recordingDuration={recordingDuration} 
          stopRecording={stopRecording} 
        />
      ) : (
        <ComposerView 
          {...props}
          text={text}
          setText={setText}
          setIsFocused={setIsFocused}
          openImagePicker={openImagePicker}
        />
      )}
    </View>
  );
};

const RecordingView = ({ recordingDuration, stopRecording }) => (
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
);

const ComposerView = ({ text, setText, setIsFocused, openImagePicker, ...props }) => (
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
      onPress={() => openImagePicker({ source: "camera" })}
    >
      <Ionicons name="camera" size={24} color="#007AFF" />
    </TouchableOpacity>
  </>
); 