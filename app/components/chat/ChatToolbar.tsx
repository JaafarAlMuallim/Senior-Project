import { IMessage, InputToolbar, InputToolbarProps } from "react-native-gifted-chat";

export const renderInputToolbar = (props: InputToolbarProps<IMessage>) => (
  <InputToolbar
    {...props}
    containerStyle={{
      borderTopWidth: 1,
      borderTopColor: "#e8e8e8",
      padding: 8,
      backgroundColor: "#f5f5f5",
    }}
  />
); 