import { Ionicons } from "@expo/vector-icons";
import { Actions, ActionsProps } from "react-native-gifted-chat";

interface ChatActionsProps extends ActionsProps {
  openImagePicker: (options: { source: 'library' }) => Promise<void>;
  openDocumentPicker: (options: {}) => Promise<void>;
}

export const ChatActions = ({ openImagePicker, openDocumentPicker, ...props }: ChatActionsProps) => (
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